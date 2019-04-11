import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoadingController} from '@ionic/angular';
import {SimpleAlertService} from './simple-alert.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = environment.url;
  constructor( private http: HttpClient, private loadingCtrl: LoadingController) { }
  onRegister(phone: string, email: string , username: string , password: string, name: string) {
    this.loadingCtrl
        .create({ keyboardClose: true, message: 'Logging in...' })
        .then(loadingEl => {
          loadingEl.present();
          const body = {
              email: email,
              password: password,
              username: username,
              name: name
          };
          const serverUrl = this.url;
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            }),
          };
          this.http.post<any>(`${serverUrl}/register`, JSON.stringify(body), httpOptions );
        });
  }
}
