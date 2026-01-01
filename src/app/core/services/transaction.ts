import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Operation {
  id?: number;
  montant: number;
  date: Date;
  type?: 'plus' | 'moins';
}

@Injectable({
  providedIn: 'root',
})
export class Transaction {
  // BehaviorSubject pour les bénéfices
  private beneficesSubject = new BehaviorSubject<Operation[]>([
    { id: 1, montant: 101500, date: new Date(), type: 'plus' },
    { id: 2, montant: 201500, date: new Date(), type: 'plus' },
    { id: 3, montant: 301500, date: new Date(), type: 'plus' },
  ]);

  // BehaviorSubject pour les dépenses
  private depensesSubject = new BehaviorSubject<Operation[]>([
    { id: 1, montant: 1000, date: new Date(), type: 'moins' },
    { id: 2, montant: 2000, date: new Date(), type: 'moins' },
    { id: 3, montant: 3000, date: new Date(), type: 'moins' },
  ]);

  // Observable réactif pour les bénéfices et les dépenses
  benefices$ = this.beneficesSubject.asObservable();
  depenses$ = this.depensesSubject.asObservable();

  // Méthode pour obtenir les bénéfices
  getBenefices(): Observable<Operation[]> {
    return this.benefices$;
  }

  // Méthode pour obtenir les dépenses
  getDepenses(): Observable<Operation[]> {
    return this.depenses$;  // Corrigé pour renvoyer depenses$ et non benefices$
  }

  // Méthode pour ajouter un bénéfice
  addBenefices(op: Operation): void {
    const currentBenefices = this.beneficesSubject.value;
    const newOperation: Operation = {
      ...op,
      id: this.getNextId(currentBenefices),
      type: 'plus', // Type est 'plus' pour les bénéfices
    };
    this.beneficesSubject.next([...currentBenefices, newOperation]); // Mise à jour du flux des bénéfices
  }

  // Méthode pour ajouter une dépense
  addDepenses(op: Operation): void {
    const currentDepenses = this.depensesSubject.value;
    const newOperation: Operation = {
      ...op,
      id: this.getNextId(currentDepenses),
      type: 'moins', // Type est 'moins' pour les dépenses
    };
    this.depensesSubject.next([...currentDepenses, newOperation]); // Mise à jour du flux des dépenses
  }
   // Méthode pour supprimer une dépense
  removeDepenses(id:number): void {
    const currentDepenses = this.depensesSubject.value.filter(op => op.id !== id);
    this.depensesSubject.next([...currentDepenses]); // Mise à jour du flux des dépenses
  }
  removeBenefices(id:number):void{
    const currentBenefices = this.beneficesSubject.value.filter(op => op.id !== id);
    this.beneficesSubject.next([...currentBenefices]);
  }

  // Méthode pour générer un nouvel ID
  private getNextId(list: Operation[]): number {
    return list.length > 0
      ? Math.max(...list.map(o => o.id ?? 0)) + 1
      : 1;
  }
}
