import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {switchMap} from 'rxjs/operators';
import {SearchResponse} from '../models/searchUser.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  serverUrl = environment.url;
  constructor(private http: HttpClient, private auth: AuthService) { }
  searchUsers(inputValue: string, contacts: any) {
    const body = {
      data: contacts,
      name: inputValue
    };
    return this.auth.token.pipe(switchMap(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type':  'application/json'
        })
      };
      return this.http.post<SearchResponse>(`${this.serverUrl}/search`, JSON.stringify(body) , httpOptions);
    }));
  }

  searchAllUsers(contacts: any) {
    const body = {
      data: contacts
    };
    return this.auth.token.pipe(switchMap(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type':  'application/json'
        })
      };
      return this.http.post<SearchResponse>(`${this.serverUrl}/searchAll`, JSON.stringify(body), httpOptions);
    }));
  }
}
