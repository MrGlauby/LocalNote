import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@local-note/button';
import { NoteSignalStore } from '@local-note/note.model.ts';
import {NotesCreate} from'@local-note/notes-create';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [
    Button, 
    NotesCreate, 
    RouterLink,
  ]
})
export class Dashboard {

// methoden aufruf creatNote


  store = inject(NoteSignalStore);

  // Beispiel: alle Notes anzeigen
  notes = this.store.notes;
  noteCount = this.store.noteCount;
  

}
