import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdatePicturePage } from './update-picture.page';
import {SharedModule} from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UpdatePicturePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      SharedModule
  ],
  declarations: [UpdatePicturePage]
})
export class UpdatePicturePageModule {}
