import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
  dateCreation: Date;
  desactive?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private accounts: User[] = [
    { id: 1, prenom: 'Ali', nom: 'Omar', password: 'password1', email: 'Ali@gmail.com', dateCreation: new Date(), desactive: false },
    { id: 2, prenom: 'Ahmed', nom: 'Ossman', password: 'password2', email: 'ahmed@gmail.com', dateCreation: new Date(), desactive: false }
  ];

  constructor(private router : Router){}

  private userSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(this.loadUserFromStorage());

  user$: Observable<User | null> = this.userSubject$.asObservable();

  // Charger l'utilisateur depuis le localStorage au démarrage
  private loadUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getLoggedUser(): Observable<User | null> {
    return this.user$;
  }

  getLoggedUserSync(): User | null {
    return this.userSubject$.value;
  }

  logIn(u: { email: string; password: string }): boolean {
    const user = this.accounts.find(acc => acc.email === u.email && acc.password === u.password);
    if (user) {
      this.userSubject$.next(user);
      localStorage.setItem('user', JSON.stringify(user)); // ← persistance
      return true;
    }
    return false;
  }

  logOut() {
    this.userSubject$.next(null);
    localStorage.removeItem('user'); // ← supprimer la persistance
    this.router.navigate(['/home']);
  }

  modifyUser(u: User) {
    if (this.userSubject$.value?.id === u.id) {
      const user = { ...this.userSubject$.value, ...u };
      this.userSubject$.next(user);
      localStorage.setItem('user', JSON.stringify(user)); // mettre à jour persistance
    }
  }

  toggleActivateUser(id: number) {
    if (this.userSubject$.value?.id === id) {
      const user = { ...this.userSubject$.value, desactive: !this.userSubject$.value.desactive };
      this.userSubject$.next(user);
      localStorage.setItem('user', JSON.stringify(user)); // mettre à jour persistance
    }
  }
}
