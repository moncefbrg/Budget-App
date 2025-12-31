import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'home', loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule) },
    {path: 'depenses', loadChildren: () => import('./features/depenses/depenses-module').then(m => m.DepensesModule) },
    {path: 'benefices',loadChildren :() => import('./features/benefice/benefice-module').then(m => m.BeneficeModule)},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
