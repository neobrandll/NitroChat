import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForwardChatPage } from './forward-chat.page';
import {SharedModule} from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: NewChatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      SharedModule
  ],
  declarations: [ForwardChatPage]
})
export class NewChatPageModule {}
