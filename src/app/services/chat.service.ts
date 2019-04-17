import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment as ENV} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

    getPreviewChats(headers): Observable<any> {
    return this.http.get<any>(`${ENV.url}/chats`, {headers, observe: 'response'});
  }
}
