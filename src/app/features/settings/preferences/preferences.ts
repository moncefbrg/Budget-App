import { Component, OnInit } from '@angular/core';
import { IObjectif, Objectif } from '../../../core/services/objectif';

@Component({
  selector: 'app-preferences',
  standalone:false,
  templateUrl: './preferences.html',
  styleUrls: ['./preferences.css'],
})
export class Preferences implements OnInit {
  // L'objectif peut être null si non défini
  objectif: IObjectif | null = null;
  

  // Objet temporaire pour l'édition (toujours un IObjectif complet)
  tempObj: IObjectif = {
    id: null,
    userId: null,
    dDebut: null as unknown as Date, // si dates vides
    dFin: null as unknown as Date,
    annuel: 0,
    benefice: 0,
    depense: 0,
    note: ''
  };

  modifyBoolean: boolean = false;

  constructor(private objectifService: Objectif) {}

  ngOnInit(): void {
    this.objectifService.getObjectif().subscribe(o => {
      if (o) {
        this.objectif = o;
        // On copie l'objectif complet dans tempObj
        this.tempObj = { ...o };
      }
    });
  }

  // Lancer l'édition
  toggleModify() {
    if (this.objectif) {
      this.tempObj = { ...this.objectif }; // copie complète
      this.modifyBoolean = true;
    }
  }

  // Annuler les modifications
  cancel() {
    this.modifyBoolean = false;
    if (this.objectif) {
      this.tempObj = { ...this.objectif }; // reset
    }
  }

  // Sauvegarder les modifications
  modifyObjectif(o: IObjectif) {
    if (!this.objectif) return;

    this.objectifService.modifyObjectif(o);
    this.modifyBoolean = false;
  }
}
