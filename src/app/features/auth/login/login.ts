import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private authService : Auth){}

}
