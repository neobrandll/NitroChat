import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HeadersService} from './headers.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


interface NewGroup {
  typeConversation: number;
  users: number[];
  attachment: string;
  converName: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewGroupService {
  private _group = new BehaviorSubject<PreGroup>(null);
  serverUrl = environment.url;

  constructor(private headerService: HeadersService, private http: HttpClient) { }

  get group() {
    return this._group.asObservable();
  }

  setGroup(group: PreGroup) {
    this._group.next(group);
  }

  createGroup(group: NewGroup) {
    const header = this.headerService.getHeaders();
    return this.http.post<any>(`${this.serverUrl}/newChat`, group, {headers: header});
  }
}
