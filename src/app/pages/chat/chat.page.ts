import { Component, OnInit } from '@angular/core';
import {take} from 'rxjs/operators';
/*import {HeadersService} from '../.././services/headers.service';
import {ChatService} from '../.././services/chat.service';
*/
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
// chats: Chats[];

	//constructor(private chatService: ChatService, private headers: HeadersService) { }

//
//   ionViewWillEnter() {
//     this.chatService.loadChatsArray() .subscribe( chatsResponse => {
//       this.chats = chatsResponse.chats;
//     }, error1 => {
//       console.log(error1);
//     });
//   }
  ngOnInit() {
 /* 	this.chatService.getPreviewChats(this.headers.getHeaders()).subscribe(r => {
  	console.log(r);
  	})*/
  }

}
