import { Injectable } from '@angular/core';
import {switchMap, take, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User, UserResponse} from '../models/user.model';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {SimpleAlertService} from './simple-alert.service';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  serverUrl = environment.url;
  constructor(private http: HttpClient, private auth: AuthService, private alert: SimpleAlertService) { }

  updateProfile(body: {}) {
   return this.auth.token.pipe(take(1), switchMap(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.put<UserResponse>(`${this.serverUrl}/updateProfile`, JSON.stringify(body), httpOptions);
    }), tap(updateResp => {
      const updatedUser = new User(
          updateResp.token,
          updateResp.user.users_id,
          updateResp.user.users_email,
          updateResp.user.users_name,
          updateResp.user.users_username,
          updateResp.user.user_picture_url,
          updateResp.user.users_creation_time,
          updateResp.user.users_phone
      );
      this.auth.updateUser(updatedUser);
      this.alert.showAlert('Success!', 'Update Complete!');
    }, () => {
      this.alert.showAlert('Error!', 'An error has occurred');
    }));
  }

  updatePicture(image: any) {
    let firstToken: string;
    return this.auth.token.pipe(take(1), switchMap(token => {
      firstToken = token;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      const body = new FormData();
      body.append('image', image);
      return this.http.post<UserResponse>(`${this.serverUrl}/updatePicture`, body , httpOptions);
    }), tap(data => {
      const newUser = new User(
          data.token
          , data.user.users_id
          , data.user.users_email
          , data.user.users_name
          , data.user.users_username
          , data.user.user_picture_url
          , data.user.users_creation_time
          , data.user.users_phone
      );
      this.auth.updateUser(newUser);
    }));

  }
}
