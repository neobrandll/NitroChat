import { Component, OnInit } from '@angular/core';
import {take} from 'rxjs/operators';
import {ChatPreview} from '../../models/chatPreview.model';
import {HeadersService} from './../../services/headers.service';
import {ChatService} from './../../services/chat.service';
import {AuthService} from './../../services/auth.service';
import {User} from './../../models/user.model';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
	chats: ChatPreview[];
	chatRoom = 'user ';
	myUser: User;
	msgConn;
	constructor(private chatService: ChatService,
		private headers: HeadersService,
		private socket: Socket,
		private auth: AuthService) {
    this.msgConn = this.getMessages().subscribe(r => {
      console.log(r);
      for (let i = 0; i < this.chats.length; i++){
          if (r.conversations_id === this.chats[i].conversations_id) {
            this.chats[i].last_message = r;
          }
      }
    })
		 }
//
//   ionViewWillEnter() {
//     this.chatService.loadChatsArray() .subscribe( chatsResponse => {
//       this.chats = chatsResponse.chats;
//     }, error1 => {
//       console.log(error1);
//     });
//   }
 async ngOnInit() {
 	    this.chats = [];
 	const _headers = this.headers.getHeaders();
 	this.auth.user.subscribe(user => {
      this.myUser = user;
    });
  	this.chatService.getPreviewChats(this.headers.getHeaders()).subscribe(r => {
  		console.log(r.body.chats);
  		this.chats = r.body.chats.filter(r => r !== null);
  	})
  }

    ionViewDidEnter() {
    this.socket.connect();
    this.socket.emit("open-app", {
      room: `${this.chatRoom}${this.myUser.id}`
    });
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket.on('dash-msg', data => {
        observer.next(data);
      });
    });
    return observable;
  }

  deleteChat(data){
    console.log(data);
    for (let i = 0; i < this.chats.length; i++){
      if (this.chats[i].conversations_id === +data.chatId){
        this.chats.splice(i,1);
      }
    }
  }
}
