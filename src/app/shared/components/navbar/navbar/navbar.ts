import { CommonModule} from '@angular/common';
import { EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { User } from '../../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
  @Input() user : User | null = null;
  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();
  show: boolean = true;

  constructor(private router:Router ,){}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.show = event.url !== '/auth/login' && event.url !== '/auth/register';
        console.log(event.url)
      });
  }
  isCollapsed = true;
  onLogin(){
    this.router.navigate(['/auth/login']);
  }
  onLogout(){
    this.logout.emit();
  }
  toggleMenu(){
    this.isCollapsed = !this.isCollapsed;
  }
}
