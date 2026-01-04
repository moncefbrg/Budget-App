import { Component, OnInit } from '@angular/core';
import { IObjectif, Objectif } from '../../../core/services/objectif';

@Component({
  selector: 'app-preferences',
  standalone:false,
  templateUrl: './preferences.html',
  styleUrls: ['./preferences.css'],
})
export class Preferences implements OnInit {
  objectif: IObjectif | null = null;

  // tempObj pour l'édition : dDebut et dFin sont des strings "yyyy-MM-dd"
  tempObj: {
    id: number | null;
    userId: number | null;
    dDebut: string;
    dFin: string;
    annuel: number;
    benefice: number;
    depense: number;
    note: string;
  } = {
    id: null,
    userId: null,
    dDebut: '',
    dFin: '',
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
        this.tempObj = {
          id: o.id,
          userId: o.userId,
          dDebut: o.dDebut.toISOString().substring(0, 10), // "yyyy-MM-dd"
          dFin: o.dFin.toISOString().substring(0, 10),
          annuel: o.annuel ?? 0,
          benefice: o.benefice ?? 0,
          depense: o.depense ?? 0,
          note: o.note ?? ''
        };
      }
    });
  }

  toggleModify() {
    if (this.objectif) {
      this.tempObj = {
        id: this.objectif.id,
        userId: this.objectif.userId,
        dDebut: this.objectif.dDebut.toISOString().substring(0, 10),
        dFin: this.objectif.dFin.toISOString().substring(0, 10),
        annuel: this.objectif.annuel ?? 0,
        benefice: this.objectif.benefice ?? 0,
        depense: this.objectif.depense ?? 0,
        note: this.objectif.note ?? ''
      };
      this.modifyBoolean = true;
    }
  }

  cancel() {
    this.modifyBoolean = false;
    if (this.objectif) {
      this.tempObj = {
        id: this.objectif.id,
        userId: this.objectif.userId,
        dDebut: this.objectif.dDebut.toISOString().substring(0, 10),
        dFin: this.objectif.dFin.toISOString().substring(0, 10),
        annuel: this.objectif.annuel ?? 0,
        benefice: this.objectif.benefice ?? 0,
        depense: this.objectif.depense ?? 0,
        note: this.objectif.note ?? ''
      };
    }
  }

  modifyObjectif() {
    if (!this.objectif) return;

    // Reconvertir string → Date avant d'envoyer au service
    const objToSave: IObjectif = {
      id: this.tempObj.id,
      userId: this.tempObj.userId,
      dDebut: new Date(this.tempObj.dDebut),
      dFin: new Date(this.tempObj.dFin),
      annuel: this.tempObj.annuel,
      benefice: this.tempObj.benefice,
      depense: this.tempObj.depense,
      note: this.tempObj.note
    };

    this.objectifService.modifyObjectif(objToSave);
    this.modifyBoolean = false;
  }
}
