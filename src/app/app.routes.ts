import { Routes } from '@angular/router';
import { LandingPage } from './components/landing-page/landing-page';
import { Office } from './components/office/office';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPage },
  { path: 'office', component: Office },
  { path: '**', redirectTo: '/landing' }, // ha rossz URL-t ír be valaki
];
