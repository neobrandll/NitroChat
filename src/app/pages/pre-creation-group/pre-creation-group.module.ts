import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreCreationGroupPage } from './pre-creation-group.page';

const routes: Routes = [
  {
    path: '',
    component: PreCreationGroupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreCreationGroupPage]
})
export class PreCreationGroupPageModule {}
