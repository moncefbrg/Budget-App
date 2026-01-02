import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found/not-found';

export const routes: Routes = [
    {path: 'home', loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule) },
    {path: 'depenses', loadChildren: () => import('./features/depenses/depenses-module').then(m => m.DepensesModule) },
    {path: 'benefices',loadChildren :() => import('./features/benefice/benefice-module').then(m => m.BeneficeModule)},
    {path: 'settings',loadChildren : ()=> import('./features/settings/settings-module').then(m => m.SettingsModule)},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**',component:NotFound}
];
