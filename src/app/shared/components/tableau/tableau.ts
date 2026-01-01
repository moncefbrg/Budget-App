import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Operation } from '../../../core/services/transaction';

@Component({
  selector: 'app-tableau',
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './tableau.html',
  styleUrls: ['./tableau.css'],
})
export class Tableau implements OnChanges {

  /* ================= INPUT ================= */

  @Input() data: Operation[] = [];
  @Output() delete = new EventEmitter<number>; 

  /* ================= PAGINATION ================= */

  paginatedData: Operation[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  /* ================= EDITION ================= */

  editingRowId?: number;
  editedRow: Partial<Operation> = {};

  /* ================= LIFECYCLE ================= */

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.currentPage = 1;
      this.totalPages = Math.max(
        1,
        Math.ceil(this.data.length / this.pageSize)
      );
      this.updatePaginatedData();
    }
  }

  /* ================= PAGINATION LOGIC ================= */

  updatePaginatedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.data.slice(start, start + this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  /* ================= EDITION LOGIC ================= */

  toggleEdit(row: Operation): void {
    this.editingRowId = row.id;
    this.editedRow = { ...row };
  }

  saveEdit(row: Operation): void {
    if (this.editedRow.montant !== undefined) {
      row.montant = this.editedRow.montant;
    }
    if (this.editedRow.date) {
      row.date = this.editedRow.date;
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingRowId = undefined;
    this.editedRow = {};
  }

  /* ================= DELETE ================= */

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}
