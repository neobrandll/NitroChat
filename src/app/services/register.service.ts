import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoadingController} from '@ionic/angular';
import {SimpleAlertService} from './simple-alert.service';
import {Observable, Observer} from 'rxjs';
import {RegisterResponse} from '../models/registerResponse.model';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = environment.url;
  constructor( private http: HttpClient, private loadingCtrl: LoadingController) { }

  onRegister(phone: string, email: string , username: string , password: string, name: string) {
          const body = {
              email: email,
              password: password,
              username: username,
              name: name,
              phone: phone
          };
          const serverUrl = this.url;
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
         return this.http.post<RegisterResponse>(`${serverUrl}/register`, JSON.stringify(body), httpOptions );
  }
}
