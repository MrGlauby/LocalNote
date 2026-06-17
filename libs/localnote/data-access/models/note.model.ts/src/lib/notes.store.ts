import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Note } from './note.model';
import { computed, effect, inject } from '@angular/core';
import { StorageService } from './storage.service';


const STORAGE_KEY = 'local_note_app_data';

type NoteState = {
  notes: Note[];
  isLoading: boolean;
};

const initialState: NoteState = {
  notes: [],
  isLoading: true,
};

export const NoteSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, storage = inject(StorageService)) => ({
    loadFromStorage() {
      const saveNotes = storage.load<Note[]>(STORAGE_KEY, []);
      patchState(store, { notes: saveNotes, isLoading: false });
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
    rootNotes: computed(() => store.notes().filter((n) => n.parentId === null)),
    getChildren: computed(
      () => (parentId: string) => store.notes().filter((n) => n.parentId === parentId)
    ),
  })),

  withHooks({
    onInit(store, storage = inject(StorageService)) {
      // 1. Initial laden
      store.loadFromStorage();

      // 2. Automatischer Speicher-Effekt (Autosave)
      // Jedes Mal wenn sich store.notes() ändert, wird dieser Code ausgeführt
      effect(() => {
        const notes = store.notes();
        if (!store.isLoading()) {
          storage.save(STORAGE_KEY, notes);
          console.log('📝 Autosave in LocalStorage erfolgt');
        }
      });
    },
  })
);
