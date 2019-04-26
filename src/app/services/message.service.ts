import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment as ENV} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  deleteMessage(id, headers): Observable<any> {
      return this.http.delete<any>(`${ENV.url}/chats/${id}/messages`, {headers, observe: 'response'});
  	}
}
