import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ChatMessage} from '../../models/chatMessage.model';
import {Socket} from 'ngx-socket-io';

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
  constructor(private socket: Socket) { }

  ngOnInit() {
    this.color = this.colorArr[Math.floor(Math.random() * this.colorArr.length) - 1];
    console.log(this.message.created_at);
    this.createdDate = new Date(this.message.created_at);
  }

  deleteMessage (chat, id){
    this.socket.emit('delete-msg', {room: `chat ${chat}`, chatId: chat, messageId: id});
  }

}
