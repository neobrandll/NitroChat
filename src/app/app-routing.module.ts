import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/chat/chat.module#ChatPageModule', canLoad: [AuthGuard] },
  {path: 'edit/updatePicture'
    , loadChildren: './pages/edit-profile/update-picture/update-picture.module#UpdatePicturePageModule'
    , canLoad: [AuthGuard]},
  {path: 'edit', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule', canLoad: [AuthGuard]},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  {path: 'new-chat', loadChildren: './pages/chat/new-chat/new-chat.module#NewChatPageModule'},
  {path: 'chat/:id', loadChildren: './pages/chat/single-chat/single-chat.module#SingleChatPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
