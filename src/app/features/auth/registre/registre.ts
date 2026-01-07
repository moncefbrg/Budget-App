import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-registre',
  standalone:false,
  templateUrl: './registre.html',
  styleUrl: './registre.css',
})
export class Registre {

  constructor(private authService : Auth){}

}
