import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'basic-signal',
    pathMatch: 'full',
  },
  {
    path: 'linked-signal',
    loadComponent: () =>
      import('./linked-signal/linked-signal.component').then(
        (m) => m.LinkedSignalComponent
      ),
  },
  {
    path: 'http-resource',
    loadComponent: () =>
      import('./http-resource/http-resource.component').then(
        (m) => m.HttpResourceComponent
      ),
  },
  {
    path: 'resource-signal',
    loadComponent: () =>
      import('./resource-signal/resource-signal.component').then(
        (m) => m.ResourceSignalComponent
      ),
  },
  {
    path: 'basic-signal',
    loadComponent: () =>
      import('./basic-signal/basic-signal.component').then(
        (m) => m.BasicSignalComponent
      ),
  },
];
