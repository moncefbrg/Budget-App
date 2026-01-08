import { Component, OnChanges, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar/navbar";
import { Footer } from "./shared/components/footer/footer/footer";
import { Auth, User } from './core/services/auth';
import { filter } from 'rxjs';
import { CoreModule } from './core/core-module';

@Component({
  selector: 'app-root',
  imports: [ CommonModule, CoreModule, RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  user:User | null = null;
  showFooter:boolean = true;
  constructor(private authService:Auth,private router:Router){}
  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe(
      (u)=> {
        this.user=u;
        console.log(this.user,'depuis app.ts')
      }
    );
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      (event)=>{
        this.showFooter = event.url !== '/auth/login' && event.url !== '/auth/register';
      }
    )
  }
 
  logout(){
    this.authService.logOut();
  }

}
