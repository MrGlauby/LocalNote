import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Note } from './note.model';
import { computed, effect, inject } from '@angular/core';
import { StorageService } from './storage.service';

// **NoteSignalStore (State):** Hält die Notizen im Arbeitsspeicher (RAM), damit die UI superschnell darauf zugreifen kann.


// was macht das? ISt das einfach nur eine konvention?
const STORAGE_KEY = 'local_note_app_data';

type NoteState = {
  notes: Note[];
  isLoading: boolean; // was sll das? Woher kommt das ? Soll wichtig für den autosave sein - der er nicht die gesamte zeit autospeichert!
};

const initialState: NoteState = {
  notes: [],
  isLoading: true, // vermutlich die enschaltung des isLoading;
};

export const NoteSignalStore = signalStore(

  { providedIn: 'root' },
  withState(initialState),


  // imprt in withMethods - methode vom STORE - StorageService
  withMethods((store, storage = inject(StorageService)) => ({
         // Methode zum Laden der Daten aus dem LocalStorage
loadFromStorage() {
  // staorageKey am anfang zeile 10 - 
  const saveNotes = storage.load<Note[]>(STORAGE_KEY, []);
  patchState(store, {notes: saveNotes, isLoading: false});
},

      
    createNote(note: Note) {
      patchState(store, (state) => ({
        notes: [...state.notes, note], // die neue Notiz??
      }));
    },

    deleteNote(noteId: string) {
      patchState(store, (state) => ({
        notes: state.notes.filter((n) => n.id !== noteId),
      }));
    },

    

    

    // update note ersetzt nicht das ganze objekt sondern nur bestimmte "Felder"
    updateNote(noteId: string, updatedNote: Partial<Note>) {
      patchState(store, (state) => ({
        notes: state.notes.map((n) => (n.id === noteId ? { ...n, ...updatedNote } : n)),
      }));
    },
  })),
  withComputed((store) => ({
    noteCount: computed(() => store.notes().length),
    getNoteById: computed(() => (id: string) => store.notes().find((n) => n.id === id)),
  })),


  withHooks({
    onInit(store, storage = inject(StorageService)) {
      // 1. Initial laden
      store.loadFromStorage();

      // 2. Automatischer Speicher-Effekt (Autosave)
      // Jedes Mal wenn sich store.notes() ändert, wird dieser Code ausgeführt
      effect(() => {
        const notes = store.notes();
        if (!store.isLoading()) { // Verhindert Überschreiben beim Start
          storage.save(STORAGE_KEY, notes);
          console.log('📝 Autosave in LocalStorage erfolgt');
        }
      });
    },
  })

);
