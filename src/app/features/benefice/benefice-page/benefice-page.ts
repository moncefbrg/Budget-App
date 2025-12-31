import { Component, OnInit } from '@angular/core';
import { Operation, Transaction } from '../../../core/services/transaction';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-benefice-page',
  standalone: false,  
  templateUrl: './benefice-page.html',
  styleUrl: './benefice-page.css',
})
export class BeneficePage implements OnInit {

  data$: Observable<Operation[]> | undefined; // Observable des données des bénéfices

  constructor(private dataService: Transaction) {}

  ngOnInit(): void {
    this.data$ = this.dataService.getBenefices(); // Souscrire automatiquement via async pipe
  }

  onAddBenefice(m: number) {
    const operation: Operation = {
      montant: m,
      date: new Date(),
      type: 'plus',
    };

    this.dataService.addBenefices(operation); // Ajoute un bénéfice
  }
}