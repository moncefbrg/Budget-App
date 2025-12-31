import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../core/services/transaction';

@Component({
  selector: 'app-depenses-page',
  standalone: false,
  templateUrl: './depenses-page.html',
  styleUrl: './depenses-page.css',
})
export class DepensesPage implements OnInit{
  data:any;
  constructor(private dataService:Transaction){}
  
  ngOnInit(): void {
    this.data = this.dataService.getDepenses();
  }
  onAddDepense(montant: number) {
    console.log('Nouvelle dépense ajoutée :', montant);
  }
}
