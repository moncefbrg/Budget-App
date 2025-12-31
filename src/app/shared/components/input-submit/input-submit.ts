import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-submit',
  imports: [
    FormsModule,
    CommonModule
],
  templateUrl: './input-submit.html',
  styleUrl: './input-submit.css',
})
export class InputSubmit {
  @Input() value_button:string ='';
  @Input() color_button:string ='primary';
  @Input() disabled_button:boolean = true;
  @Output() submit = new EventEmitter<number>();
  nombre:number | null = null;

  checkValue() {
    this.disabled_button = this.nombre === null 
    || this.nombre <= 0 
    || isNaN(this.nombre) 
    || this.nombre > 100000000000 
    || this.nombre.toString().length > 12;
  }

  sendValue() {
    this.submit.emit(this.nombre?this.nombre:0);
    this.nombre = null;
    this.disabled_button = true;
  }
}
