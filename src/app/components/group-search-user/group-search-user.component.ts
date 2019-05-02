import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {SearchedUser} from '../../models/searchUser.model';

@Component({
  selector: 'app-group-search-user',
  templateUrl: './group-search-user.component.html',
  styleUrls: ['./group-search-user.component.scss'],
})
export class GroupSearchUserComponent implements OnInit {
  @Input() user: SearchedUser;
  @Output() selectEvent: EventEmitter<number> = new EventEmitter();
  @Output() unSelectEvent: EventEmitter<number> = new EventEmitter();
  serverUrl = environment.url;
  selected = false;
  constructor() { }

  ngOnInit() {}

  onClick() {
    if (this.selected) {
      this.selected = !this.selected;
      this.unSelectEvent.emit(this.user.id);
    } else {
      this.selected = !this.selected;
      this.selectEvent.emit(this.user.id);
    }
  }
}
