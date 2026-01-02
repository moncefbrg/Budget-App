import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
export interface User{
  id:number,
  nom:string,
  prenom:string,
  email:string,
  dateCreation:Date,
  desactive?:boolean,
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private userSubject$ = new BehaviorSubject<User | null>(
    {id:1,prenom:'Ahmed',nom:'Ossman',email:'ahmedossman@gmail.com',dateCreation:new Date(),desactive:false}
  );

  constructor(){
    this.logOut();
  }
  user$ = this.userSubject$.asObservable();

  getLoggedUser(){
    return this.user$;
  }

  modifyUser(u:User){
    if(this.userSubject$.value?.id === u.id){
      const user={...this.userSubject$.value};
      user.nom = u.nom;
      user.prenom = u.prenom;
      user.email = u.email;
      this.userSubject$.next(user);
    }
    console.log(this.userSubject$.value);
  }
  toggleActivateUser(id:number){
    if(this.userSubject$.value?.id === id){
      const user={...this.userSubject$.value};
      user.desactive = !user.desactive;
      this.userSubject$.next(user);
    }
  }

  logIn(u:User | undefined){
    if(u){
      this.userSubject$.next(u);
    }else{
      this.userSubject$.next({id:1,prenom:'Ali',nom:'Omar',email:'ahmedossman@gmail.com',dateCreation:new Date(),desactive:false});
    }
  }

  logOut(){
    this.userSubject$.next(null);
  }
  
}
