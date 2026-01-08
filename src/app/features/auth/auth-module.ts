import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { Registre } from './registre/registre';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { authGuard } from '../../core/guards/auth-guard';
import { guestGuard } from '../../core/guards/guest-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [guestGuard] },    // ← utilisateur NON connecté
  { path: 'register', component: Registre, canActivate: [guestGuard] }, // ← idem
];


@NgModule({
  declarations: [
    Login,
    Registre,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
]
})
export class AuthModule { }
