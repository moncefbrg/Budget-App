import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-objectif-details',
  imports: [CommonModule],
  templateUrl: './objectif-details.html',
  styleUrls: ['./objectif-details.css'],
})
export class ObjectifDetails implements OnChanges {

  // Valeurs reçues en entrée
  @Input() objectif: number = 0; // objectif à atteindre
  @Input() gagne: number = 0;    // montant déjà gagné ou dépensé
  @Input() type: 'Bénéfice' | 'Dépense' = 'Bénéfice';

  // Jours restants jusqu'au 31 décembre
  joursRestants: number = 0;

  // Valeurs calculées
  reste: number = 0;        // montant restant à atteindre ou à ne pas dépasser
  parJour: number = 0;      // montant restant / jour
  parMois: number = 0;      // montant restant / mois
  pourcentage: number = 0;  // pourcentage atteint
  depassement: number = 0;  // montant dépassé si gagne > objectif

  private anneeActuelle: number = new Date().getFullYear();

  ngOnChanges(): void {
    this.calculerJoursRestants();
    this.calculerValeurs();
  }

  /**
   * Calcule le nombre de jours restants jusqu'au 31 décembre
   */
  private calculerJoursRestants(): void {
    const dateFinAnnee = new Date(this.anneeActuelle, 11, 31); // décembre = 11
    const dateActuelle = new Date();

    const diffMs = dateFinAnnee.getTime() - dateActuelle.getTime();
    this.joursRestants = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (this.joursRestants < 0) this.joursRestants = 0;
  }

  /**
   * Calcule toutes les valeurs de suivi
   */
  private calculerValeurs(): void {
    // Calcul du dépassement si gain > objectif
    this.depassement = Math.max(this.gagne - this.objectif, 0);

    if (this.type === 'Bénéfice') {
      this.reste = Math.max(this.objectif - this.gagne, 0); // ce qu'il reste à gagner
      this.parJour = this.joursRestants > 0 ? +(this.reste / this.joursRestants).toFixed(2) : 0;
      this.parMois = +(this.reste / 12).toFixed(2);
      this.pourcentage = this.objectif > 0 ? +((this.gagne / this.objectif) * 100).toFixed(1) : 0;
    } else {
      // Dépense : ce qui reste avant de dépasser
      this.reste = Math.max(this.objectif - this.gagne, 0);
      this.parJour = this.joursRestants > 0 ? +(this.reste / this.joursRestants).toFixed(2) : 0;
      this.parMois = +(this.reste / 12).toFixed(2);
      this.pourcentage = this.objectif > 0 ? +((this.gagne / this.objectif) * 100).toFixed(1) : 0;
    }
  }
}
