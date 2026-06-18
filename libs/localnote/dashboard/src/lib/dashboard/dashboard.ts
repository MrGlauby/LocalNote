import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoteSignalStore } from '@local-note/note.model.ts';
import { NotesCreate } from '@local-note/notes-create';
import { CreateFolder } from '@local-note/create-folder';
import { HolidayService } from '@local-note/data-access';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [NotesCreate, RouterLink, CreateFolder],
})
export class Dashboard {
  store = inject(NoteSignalStore);
  holidayService = inject(HolidayService);

  notes = this.store.rootNotes;
  noteCount = this.store.noteCount;

  openedFolderIds = signal<string[]>([]);

  onDragStart(event: DragEvent, id: string): void {
    event.dataTransfer?.setData('noteId', id);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetNote: any): void {
    event.preventDefault();

    const draggedId = event.dataTransfer?.getData('noteId');

    if (draggedId && targetNote.type === 'folder' && draggedId !== targetNote.id) {
      this.store.updateNote(draggedId, { parentId: targetNote.id });
    }
  }

  toggleFolder(id: string): void {
    this.openedFolderIds.update((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
    );
  }
}
