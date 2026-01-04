import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard-page/dashboard-page';
import { RouterModule } from '@angular/router';
import { LineChart } from '../../shared/components/line-chart/line-chart';
import { PieProgress } from "../../shared/components/pie-progress/pie-progress";
import { ObjectifDetails } from '../../shared/components/objectif-details/objectif-details';


const routes = [
  {path:'',component:DashboardPage}
];

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LineChart,
    PieProgress,
    ObjectifDetails
]
})
export class DashboradModule { }
