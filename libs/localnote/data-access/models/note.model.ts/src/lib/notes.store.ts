import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Note } from './note.model';
import { computed } from '@angular/core';

type NoteState = {
  notes: Note[];
};

const initialState: NoteState = {
  notes: [],
};

export const NoteSignalStore = signalStore(
  withState(initialState),

  withMethods((store) => ({
    createNote(note: Note) {
      patchState(store, (state) => ({
        notes: [...state.notes, note],
      }));
    },

    deleteNote(noteId: string) {
      patchState(store, (state) => ({
        notes: state.notes.filter((n) => n.id !== noteId),
      }));
      
    },

    deleteAllNotes(){
      patchState(store, {notes: [] });
    },


    // update note ersetzt nicht das ganze objekt sondern nur bestimmte "Felder"
    updateNote(noteId: string, updatedNote: Note) {
      patchState(store, (state) => ({
        notes: state.notes.map((n) => (n.id === noteId ? { ...n, ...updatedNote } : n)),
      }));
    },
  })),
  withComputed((store) => ({
    noteCount: computed(() => store.notes().length),
    getNoteById: computed(() => (id: string) => store.notes().find((n) => n.id === id)),
  }))
);


// clear all NOTES METHODE
// AI Agent Client etc.. 




