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

  searchUsers(inputValue: string) {
    return this.auth.token.pipe(switchMap(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.get<SearchResponse>(`${this.serverUrl}/search/${inputValue}`, httpOptions);
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
