import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-preview-chat',
  templateUrl: './preview-chat.component.html',
  styleUrls: ['./preview-chat.component.scss'],
})
export class PreviewChatComponent implements OnInit {
// @Input() chat: Chats;
//   serverUrl = environment.url;
//   lastMsg: ChatMessage;
//   lastMsgDate: Date;
//   constructor() { }

  ngOnInit() {
    // if (this.chat) {
    //   this.lastMsg = this.chat.messages[this.chat.messages.length - 1];
    //   this.lastMsgDate = new Date(this.lastMsg.sentAt);
    // }
  }

}
