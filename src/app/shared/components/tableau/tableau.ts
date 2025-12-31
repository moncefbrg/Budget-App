import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Operation } from '../../../core/services/transaction';

@Component({
  selector: 'app-tableau',
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './tableau.html',
  styleUrls: ['./tableau.css'],
})
export class Tableau implements OnInit {
  @Input() data: Operation[] = [];  // Initialiser avec un tableau vide
  paginatedData: Operation[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  editingRowId: number | undefined;
  editedRow: Partial<Operation> = {};

  ngOnInit(): void {
    this.updatePagination();
  }

  // Met à jour les données paginées
  updatePaginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.data.slice(start, start + this.pageSize);
  }

  // Calcule le nombre total de pages et met à jour les données paginées
  updatePagination() {
    if (this.data && this.data.length > 0) {
      this.totalPages = Math.ceil(this.data.length / this.pageSize);
      this.updatePaginatedData();
    }
  }

  // Activer le mode édition pour une ligne
  toggleEdit(row: Operation) {
    this.editingRowId = row.id;
    this.editedRow = { ...row }; // Créer une copie pour l'édition
  }

  // Sauvegarder les modifications d'une ligne
  saveEdit(row: Operation) {
    if (this.editedRow.montant !== undefined) row.montant = this.editedRow.montant;
    if (this.editedRow.date) row.date = this.editedRow.date;

    this.editingRowId = undefined; // Désactiver l'édition
    this.editedRow = {}; // Réinitialiser l'objet d'édition
  }

  // Annuler les modifications d'une ligne
  cancelEdit() {
    this.editingRowId = undefined;
    this.editedRow = {};
  }

  // Supprimer une ligne et mettre à jour la pagination
  onDelete(id: number) {
    this.data = this.data.filter(r => r.id !== id);
    this.updatePagination();  // Recalcule les pages après suppression
  }

  // Passer à la page précédente
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  // Passer à la page suivante
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }
}
