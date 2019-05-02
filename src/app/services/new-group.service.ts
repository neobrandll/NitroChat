import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NewGroupService {
  private _group = new BehaviorSubject<PreGroup>(null);

  constructor() { }

  get group() {
    return this._group.asObservable();
  }

  setGroup(group: PreGroup) {
    this._group.next(group);
  }
}
