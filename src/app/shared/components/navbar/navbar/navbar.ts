import { CommonModule} from '@angular/common';
import { EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() user : User | null = null;
  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();
  isCollapsed = true;
  onLogin(){
    this.login.emit();
  }
  onLogout(){
    this.logout.emit();
  }
  toggleMenu(){
    this.isCollapsed = !this.isCollapsed;
  }
}
