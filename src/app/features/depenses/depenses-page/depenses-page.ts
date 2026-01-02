import { Component, OnInit } from '@angular/core';
import { Operation, Transaction } from '../../../core/services/transaction';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-depenses-page',
  standalone: false,
  templateUrl: './depenses-page.html',
  styleUrl: './depenses-page.css',
})
export class DepensesPage implements OnInit{
  data$:Observable<Operation[]> | undefined;
  constructor(private dataService:Transaction){}
  
  ngOnInit(): void {
    this.data$ = this.dataService.getDepenses();
  }
  onAddDepense(montant: number) {
    const operation : Operation = {
      montant:montant,
      date:new Date()
    }
    this.dataService.addDepenses(operation);
  }
  onDeleteDepense(id:number) {
    this.dataService.removeDepenses(id);
  }
  onModifyDepense(o:Operation){
    this.dataService.editDepense(o);
  }
}
