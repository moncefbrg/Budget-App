import { Component, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar/navbar";
import { Footer } from "./shared/components/footer/footer/footer";
import { Auth, User } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  user:User | null = null;
  constructor(private authService:Auth){}
  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe(
      u=> this.user=u
    );
  }
  login(){
    this.authService.logIn(undefined);
  }
  logout(){
    this.authService.logOut();
  }

}
