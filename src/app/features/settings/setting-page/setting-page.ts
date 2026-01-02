import { Component, OnInit } from '@angular/core';
import { Auth, User } from '../../../core/services/auth';

@Component({
  selector: 'app-setting-page',
  standalone:false,
  templateUrl: './setting-page.html',
  styleUrl: './setting-page.css',
})
export class SettingPage implements OnInit{
  user:User|null = null;

  constructor(private authService : Auth){}
   ngOnInit(): void {
     this.authService.getLoggedUser().subscribe(
      u => this.user= u
     );
   }
   onModify(u:User){
    this.authService.modifyUser(u);
   }
   onTActivate(id:number){
    this.authService.toggleActivateUser(id);
   }

}
