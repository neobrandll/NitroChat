import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HeadersService} from './headers.service';

interface NewGroup {
  type: number;
  users: number[];
  attachment: string;
  converName: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewGroupService {
  private _group = new BehaviorSubject<PreGroup>(null);

  constructor(private headerService: HeadersService) { }

  get group() {
    return this._group.asObservable();
  }

  setGroup(group: PreGroup) {
    this._group.next(group);
  }

  createGroup(group: NewGroup) {
    const header = this.headerService.getHeaders();
  }
}
