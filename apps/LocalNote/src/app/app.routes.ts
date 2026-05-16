import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'dashboard',
    loadComponent: () => import('@local-note/dashboard').then((m) => m.Dashboard),
  },

  {
    path: 'notes/:id',
    loadComponent: () => import('@local-note/note-editor-detail').then((m) => m.NoteEditorDetail),
  },

];
