import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficePage } from './benefice-page/benefice-page';
import { RouterModule } from '@angular/router';
import { InputSubmit } from "../../shared/components/input-submit/input-submit";
import { Tableau } from '../../shared/components/tableau/tableau';


const routes = [
  {path:'', component : BeneficePage},
]
@NgModule({
  declarations: [
    BeneficePage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputSubmit,
    Tableau,
]
})
export class BeneficeModule { }
