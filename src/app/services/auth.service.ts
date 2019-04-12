import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SimpleAlertService} from './simple-alert.service';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';

import {BehaviorSubject, from} from 'rxjs';
import { Plugins } from '@capacitor/core';
import {environment} from '../../environments/environment';
import {User, UserResponse} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _user = new BehaviorSubject<User>(null);
  url = environment.url;

  get user() {
    return this._user.asObservable();
  }

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
        map(user => {
          if (user) {
            return !!user.token;
          } else {
            return false;
          }
        })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
        map(user => {
          if (user) {
            return user.token;
          } else {
            return null;
          }
        })
    );
  }

  constructor(private router: Router
      , private http: HttpClient
      , private alert: SimpleAlertService
  ) {
  }

  login = (username: string, password: string) => {
    const body = {
      username: username,
      password: password
    };
    const serverUrl = this.url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<UserResponse>(`${serverUrl}/login`, JSON.stringify(body), httpOptions).pipe(tap(data => {
          if (data.status === 200) {
            const newUser = new User( data.token,
                data.user.users_id,
                data.user.users_email,
                data.user.users_name,
                data.user.users_username,
                data.user.user_picture_url,
                data.user.users_creation_time,
                data.user.users_phone
            );
            this._user.next(newUser);
            this.storeUserData(newUser);
            this._userIsAuthenticated = true;
          }
        },
        errorData => {
        const button = {
            text: 'Okay',
            handler: () => {
                this.router.navigate(['/login']);
            }
        };
        this.alert.showAlert('An error occurred!', `verify your data!`, button);
        }
    ));
  }

  logout() {
    this._user.next(null);
    Plugins.Storage.remove({ key: 'userData' });
  }

  private storeUserData (
      user: User
  ) {
    const data = JSON.stringify(user);
    Plugins.Storage.set({ key: 'userData', value: data });
  }

  autoLogin() {
    return from(Plugins.Storage.get({ key: 'userData' })).pipe(
        map(storedData => {
          if (!storedData || !storedData.value) {
            return null;
          }
          const parsedData = JSON.parse(storedData.value) as {
            _token: string,
            id: number,
            email: string,
            name: string,
            username: string,
            profileImage: string,
            creationTime: string,
            phone: string
          };
          const user = new User(parsedData._token
              , parsedData.id
              , parsedData.email
              , parsedData.name
              , parsedData.username
              , parsedData.profileImage
              , parsedData.creationTime
              , parsedData.phone
          );
          return user;
        }),
        tap(userData => {
          if (userData) {
            this._user.next(userData);
          }
        }),
        map(user => {
          return !!user;
        })
    );
  }

  updateUser(updatedUser: User) {
    this._user.next(updatedUser);
    this.storeUserData(updatedUser);
  }


}
