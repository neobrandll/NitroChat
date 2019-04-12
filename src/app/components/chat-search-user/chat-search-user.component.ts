import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {SearchedUser} from '../../models/searchUser.model';

@Component({
  selector: 'app-chat-search-user',
  templateUrl: './chat-search-user.component.html',
  styleUrls: ['./chat-search-user.component.scss'],
})
export class ChatSearchUserComponent implements OnInit {
  @Input() user: SearchedUser;
  serverUrl = environment.url;
  constructor(private router: Router) { }

  ngOnInit() {

  }

}
