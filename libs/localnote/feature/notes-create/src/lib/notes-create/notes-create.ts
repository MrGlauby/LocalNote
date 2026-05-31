import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  private readonly router = inject(Router);
  store = inject(NoteSignalStore);

  createClickNote() {
    console.log('create note link!');
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Neue Notiz',
      content: '',
      parentId: null,
      createdAt: new Date(),
    };

    this.store.createNote(newNote);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/noteEditorDetail', newNote.id])
    );
    window.open(url, '_blank');
  }
}
