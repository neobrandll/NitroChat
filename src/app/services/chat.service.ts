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

  	getChatData(id, headers): Observable<any> {
      return this.http.get<any>(`${ENV.url}/chats/${id}/messages`, {headers, observe: 'response'});
  	}

  	  getChatId(id, headers): Observable<any> {
      return this.http.get<any>(`${ENV.url}/chats/${id}`, {headers, observe: 'response'});
  	}

      deleteChat(chatId, userId, headers): Observable<any> {
      return this.http.delete<any>(`${ENV.url}/chats/${chatId}/${userId}`, {headers, observe: 'response'});
    }

    getOutOfGroup(chatId, userId, headers): Observable<any> {
      return this.http.delete<any>(`${ENV.url}/group/${chatId}/${userId}`, {headers, observe: 'response'});
    }

    deleteGroup (chatId, userId, headers): Observable<any> {
      return this.http.delete<any>(`${ENV.url}/group/${chatId}`, {headers, observe: 'response'});
    }

}
