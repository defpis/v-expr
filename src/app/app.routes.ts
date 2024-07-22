import { Routes } from '@angular/router';
import { UiComponent } from './ui/ui.component';

export const routes: Routes = [
  {
    path: 'ui',
    component: UiComponent,
  },
  {
    path: '**',
    redirectTo: 'ui',
  },
];
