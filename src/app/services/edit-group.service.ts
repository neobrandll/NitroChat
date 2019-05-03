import { Injectable } from '@angular/core';
import {HeadersService} from './headers.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditGroupService {

  constructor(private headers: HeadersService, private http: HttpClient) { }

  updateChatPic(image: any, chatId: number) {
    const header = this.headers.getHeaders();
    const body = new FormData();
    body.append('image', image);
    return this.http.post<any>(`${environment.url}/group/${chatId}/updatePicture`, body, {headers: header });
  }
}
