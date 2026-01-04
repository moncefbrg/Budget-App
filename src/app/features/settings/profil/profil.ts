import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../core/services/auth';

@Component({
  selector: 'app-profil',
  standalone:false,
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class Profil implements OnChanges,OnInit{
  @Input() user:User | null = null;
  tempUser : User = {id:0,nom:'',prenom:'',email:'',dateCreation: null as unknown as Date};
  avatar :string | null = null;
  modifyBoolean : boolean = false;
  @Output() modify = new EventEmitter<User>();
  @Output() tActivate = new EventEmitter<number>();
  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.user){
      this.avatar = this.user.nom.charAt(0).toUpperCase() + this.user.prenom.charAt(0).toUpperCase();
      this.tempUser = {...this.user};
    }else{
      this.avatar=null;
    }
  }

  toggleModify(){
    this.modifyBoolean = !this.modifyBoolean;
  }
  
  modifyUser(u:User){
   this.modify.emit(u);
   this.modifyBoolean=false;
  }
  toggleActivateUser(id:number){
   this.tActivate.emit(id);
  }
  cancel(){
    this.modifyBoolean = false;
    if (this.user) {
    this.tempUser = { ...this.user }; // remet les valeurs initiales
  }
  }

}
