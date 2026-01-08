import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found/not-found';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {path: 'home',loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule) },
    {path: 'depenses', canActivate : [ authGuard ], loadChildren: () => import('./features/depenses/depenses-module').then(m => m.DepensesModule) },
    {path: 'benefices', canActivate : [ authGuard ],loadChildren :() => import('./features/benefice/benefice-module').then(m => m.BeneficeModule)},
    {path: 'settings', canActivate : [ authGuard ],loadChildren : ()=> import('./features/settings/settings-module').then(m => m.SettingsModule)},
    {path: 'dashboard', canActivate : [ authGuard ],loadChildren : ()=> import('./features/dashborad/dashborad-module').then(m => m.DashboradModule)},
    {path: 'auth' ,loadChildren: ()=> import('./features/auth/auth-module').then(m=>m.AuthModule)},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**',component:NotFound}
];
