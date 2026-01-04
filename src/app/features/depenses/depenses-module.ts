import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepensesPage } from './depenses-page/depenses-page';
import { RouterModule } from '@angular/router';
import { InputSubmit } from '../../shared/components/input-submit/input-submit';
import { Tableau } from '../../shared/components/tableau/tableau';
import { PieProgress } from "../../shared/components/pie-progress/pie-progress";

const routes = [
  { path: '', component: DepensesPage }
]


@NgModule({
  declarations: [
    DepensesPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputSubmit,
    Tableau,
]
})
export class DepensesModule { }
