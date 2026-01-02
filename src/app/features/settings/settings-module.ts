import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Profil } from './profil/profil';
import { Preferences } from './preferences/preferences';
import { RouterModule } from '@angular/router';
import { SettingPage } from './setting-page/setting-page';
import { FormsModule } from "@angular/forms";

const routes = [
  {path:'',component: SettingPage},
]

@NgModule({
  declarations: [
    Profil,
    Preferences,
    SettingPage,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DatePipe,
    FormsModule
]
})
export class SettingsModule { }
