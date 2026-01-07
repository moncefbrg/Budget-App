import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { Registre } from './registre/registre';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes =[
  {path: '',redirectTo: 'login',pathMatch:'full'},
  {path: 'login',component: Login},
  {path: 'register', component: Registre},
]

@NgModule({
  declarations: [
    Login,
    Registre,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthModule { }
