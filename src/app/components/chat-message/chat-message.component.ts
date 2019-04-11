import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  // @Input() message: ChatMessage;
  // @Input() mailedUser: UserProfile;
  serverUrl = environment.url;
  isFromMailedUser: boolean;
  sentAt: Date;
  constructor() { }

  ngOnInit() {
    // this.isFromMailedUser = (this.message.sentBy === this.mailedUser.user._id);
    // this.sentAt = new Date(this.message.sentAt);
  }

}
