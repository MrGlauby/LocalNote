import { Component, inject } from '@angular/core';
import { Button } from '@local-note/button';
import { NoteSignalStore } from '@local-note/note.model.ts';
import { Note } from '@local-note/note.model.ts';

@Component({
  selector: 'lib-notes-create',
  templateUrl: './notes-create.html',
  styleUrl: './notes-create.css',
  imports: [Button],
})
export class NotesCreate {
  store = inject(NoteSignalStore);

  createClickNote() {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Neue Notiz',
      content: '',
      parentId: null,
      createdAt: new Date(),
    };

    this.store.createNote(newNote);
  }
}
