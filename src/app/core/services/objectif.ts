import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Auth, User } from './auth';
export interface IObjectif{
  id:number| null,
  userId:number| null,
  annuel?:number,
  benefice?:number,
  depense?:number,
  dDebut:Date,
  dFin:Date,
  note?:string
}
@Injectable({
  providedIn: 'root',
})
export class Objectif {
  objectsSubject$ = new BehaviorSubject<IObjectif[]>([
    {
      id: 1,
      userId: 1,
      annuel: 110000,
      benefice: 5000,
      depense: 2000,
      dDebut: new Date('2025-01-01'),
      dFin: new Date('2025-12-31'),
      note: 'Objectif principal'
    },
    {
      id: 2,
      userId: 2,
      annuel: 85000,
      benefice: 3500,
      depense: 1800,
      dDebut: new Date('2025-03-01'),
      dFin: new Date('2025-09-30'),
      note: 'Objectif secondaire'
    },
    {
      id: 3,
      userId: 3,
      annuel: 60000,
      benefice: 2500,
      depense: 1200,
      dDebut: new Date('2025-02-15'),
      dFin: new Date('2025-11-15'),
      note: 'Objectif personnel'
    }

  ]);
  user : User | null = null;
  object$ = this.objectsSubject$.asObservable().pipe(
    map(objects =>
      objects.find(o => o.userId === this.user?.id)??null
    )
  );


  constructor(private authService:Auth){
    this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );
  }

  getObjectif():Observable<IObjectif | null>{
    return this.object$;
  }

  modifyObjectif(o:IObjectif){
    let objectifs = this.objectsSubject$.value;
    if(objectifs){
      objectifs = objectifs.filter( i => i.id !== o.id);
      objectifs.push(o);
      this.objectsSubject$.next([...objectifs]);
    }
  }


}
