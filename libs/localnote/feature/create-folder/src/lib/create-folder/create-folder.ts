import { Component, inject } from '@angular/core';
import { Note, NoteSignalStore } from '@local-note/note.model.ts';
import { Button } from '@local-note/button';

@Component({
  selector: 'create-folder',
  templateUrl: './create-folder.html',
  styleUrl: './create-folder.css',
  imports: [Button],
})
export class CreateFolder {
  readonly store = inject(NoteSignalStore);

  createFolder() {
    const folderName = prompt('Name?');

    if (folderName && folderName.trim().length > 0) {
      const newFolderAsNote: Note = {
        id: crypto.randomUUID(),
        title: folderName,
        content: '', 
        parentId: null,
        createdAt: new Date(),
        type: 'folder', 
      };

      this.store.createNote(newFolderAsNote);

      console.log('Create Folder - Sucess', folderName);
    }
  }
}

