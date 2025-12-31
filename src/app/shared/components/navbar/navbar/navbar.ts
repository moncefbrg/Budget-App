import { CommonModule} from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isCollapsed = true;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ngOnInit(){
    
  }
  

  login(){}
  logout(){}
  toggleMenu(){
    this.isCollapsed = !this.isCollapsed;
  }
}
