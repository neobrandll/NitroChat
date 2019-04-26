import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ChatMessage} from '../../models/chatMessage.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;
  createdDate: Date;
  color: string;
  colorArr= ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'dark'];
  constructor() { }

  ngOnInit() {
    this.color = this.colorArr[Math.floor(Math.random() * this.colorArr.length) - 1];
    console.log(this.message.created_at);
    this.createdDate = new Date(this.message.created_at);
  }

  deleteMessage (id){

  }

}
