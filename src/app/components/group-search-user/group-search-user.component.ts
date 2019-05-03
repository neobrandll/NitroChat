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
  @Output() selectEvent: EventEmitter<any> = new EventEmitter();
  @Output() unSelectEvent: EventEmitter<any> = new EventEmitter();
  serverUrl = environment.url;
  selected = false;
  constructor() { }

  ngOnInit() {}

  onClick() {
    if (this.selected) {
      this.selected = !this.selected;
      this.unSelectEvent.emit({id: this.user.id, chat: this.user.chatId});
    } else {
      this.selected = !this.selected;
      this.selectEvent.emit({id: this.user.id, chat: this.user.chatId});
    }
  }
}
