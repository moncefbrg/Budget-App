import { Component, OnInit } from '@angular/core';
import { Operation, Transaction } from '../../../core/services/transaction';
import { Objectif, IObjectif } from '../../../core/services/objectif';
import { filter } from 'rxjs';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-dashboard-page',
  standalone: false,
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css'], // corrigé
})
export class DashboardPage implements OnInit {
  // Benefices
  private benefices: Operation[] = [];
  chartDataBenefice!: { date: string; amount: number }[];

  // Depenses
  private depenses: Operation[] = [];
  chartDataDepense!: { date: string; amount: number }[];

  //pourcentage
  pourcentage : number = 0;

  // switch
  showBenefice: boolean = true;

  // Objectifs
  objectifBenefice: number = 0;
  objectifDepense: number = 0;

  constructor(private transService: Transaction, private objService: Objectif,private authService:Auth) {}

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe(u =>{
      if(u !== null){
        // Récupération des bénéfices
    this.transService.getBenefices().subscribe(b => {
      this.benefices = b;
      this.chartDataBenefice = this.benefices.map(b => ({ date: `${b.date}`, amount: b.montant }));
    });

    // Récupération des dépenses
    this.transService.getDepenses().subscribe(d => {
      this.depenses = d;
      this.chartDataDepense = this.depenses.map(d => ({ date: `${d.date}`, amount: d.montant }));
    });

    // Récupération des objectifs
    this.objService.getObjectif()
      .pipe(filter((o): o is IObjectif => o !== null)) // filtre les null
      .subscribe(o => {
        this.objectifBenefice = o.benefice ?? 0;
        this.objectifDepense = o.depense ?? 0;
      });
      }
    } )
    
  }

  // Totaux calculés dynamiquement
  get totalBenefice(): number {
    return this.benefices.reduce((sum, b) => sum + b.montant, 0);
  }

  get totalDepenses(): number {
    return this.depenses.reduce((sum, d) => sum + d.montant, 0);
  }

  // Toggle affichage bénéfices / dépenses
  toggleBenefice(): void {
    this.showBenefice = !this.showBenefice;
  }
  // Pourcentage du bénéfice atteint
get pourcentageBenefice(): number {
  if (this.objectifBenefice === 0) return 0;
  const pct = (this.totalBenefice / this.objectifBenefice) * 100;
  return +pct.toFixed(1); // arrondi à 1 décimale
}

// Pourcentage de la dépense utilisée
get pourcentageDepense(): number {
  if (this.objectifDepense === 0) return 0;
  const pct = (this.totalDepenses / this.objectifDepense) * 100;
  return +pct.toFixed(1); // arrondi à 1 décimale
}

}
