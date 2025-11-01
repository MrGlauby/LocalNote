import { Route } from '@angular/router';

export const appRoutes: Route[] = [


{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'dashboard',
    loadComponent: () => import ('@local-note/dashboard').then((m) => m.Dashboard),
  },


// DASHBOARD RÜCKGÖNGI MACHEN!
];
