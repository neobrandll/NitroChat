import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SimpleAlertService} from './simple-alert.service';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';

import {BehaviorSubject, from} from 'rxjs';
import { Plugins } from '@capacitor/core';
import {environment} from '../../environments/environment';

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

  login = (email: string, password: string) => {
    const body = new HttpParams()
        .set('email', email)
        .set('password', password);
    const serverUrl = this.url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<UserData>(`${serverUrl}/login`, body.toString(), httpOptions).pipe(tap(data => {
          if (data.user) {
            const newUser = new User(
                data.user.token
                , data.user._id
                , data.user.email
                , data.user.name
                , data.user.username
                , data.user.followers
                , data.user.following
                , data.user.profileImage
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
                this.router.navigate(['/auth']);
            }
        };
        this.alert.showAlert('An error occurred!', `${errorData.error.error}!`, button);
        }
    ));
  };

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
            id: string,
            email: string,
            name: string,
            username: string,
            followers: string[],
            following: string[],
            profileImage: string,
          };
          const user = new User(parsedData._token
              , parsedData.id
              , parsedData.email
              , parsedData.name
              , parsedData.username
              , parsedData.followers
              , parsedData.following
              , parsedData.profileImage
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
