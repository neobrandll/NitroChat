import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {SearchedUser} from '../../models/searchUser.model';
import {ChatPreview} from '../../models/chatPreview.model';
import {HeadersService} from './../../services/headers.service';
import {ChatService} from './../../services/chat.service';


@Component({
  selector: 'app-chat-search-user',
  templateUrl: './chat-search-user.component.html',
  styleUrls: ['./chat-search-user.component.scss'],
})
export class ChatSearchUserComponent implements OnInit {
  @Input() user: SearchedUser;
  serverUrl = environment.url;


  constructor(private router: Router, private headers: HeadersService, private http: ChatService) { }

  ngOnInit() {

  }

  goToChat() {
  	this.http.getChatId(this.user.id, this.headers.getHeaders()).subscribe(r => {
  		console.log(r);
  		this.router.navigate(['/chat', r.body.chat.conversations_id]);
  	})
  }

}
