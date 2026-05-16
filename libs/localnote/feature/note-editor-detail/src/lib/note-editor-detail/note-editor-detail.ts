import { Component, computed, effect, ElementRef, inject, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteSignalStore } from '@local-note/note.model.ts';

@Component({
  selector: 'lib-note-editor-detail',
  imports: [],
  templateUrl: './note-editor-detail.html',
  styleUrl: './note-editor-detail.css',
})
export class NoteEditorDetail {
  private readonly store = inject(NoteSignalStore);
  private readonly routeActive = inject(ActivatedRoute);

  contentInput = viewChild<ElementRef<HTMLTextAreaElement>>('c');

  readonly noteId = this.routeActive.snapshot.paramMap.get('id') ?? '';

  focusEffect = effect(() => {
    const el = this.contentInput();
    if (el) {
      el.nativeElement.focus();
    }
  });

  readonly currentNote = computed(() => this.store.getNoteById()(this.noteId));

  updateTitle(title: string): void {
    this.store.updateNote(this.noteId, { title });
  }

  updateContent(content: string): void {
    this.store.updateNote(this.noteId, { content });
  }
}
