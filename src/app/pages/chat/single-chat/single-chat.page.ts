import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription, TimeInterval} from 'rxjs';

import {switchMap, take} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user.model';
import {Conversation} from '../../../models/Conversation.model';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.page.html',
  styleUrls: ['./single-chat.page.scss'],
})
export class SingleChatPage implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) { }
   messageValue: string;
   myUser: User;
   userSub: Subscription;
   chat: Conversation;
  serverUrl = environment.url;


  ngOnInit() {
    this.userSub = this.auth.user.subscribe(user => {
      this.myUser = user;
      if (!this.chat.chat.conversation_name) {
        this.chat.chat.conversation_name = this.chat.participants.find(part => part.users_id !== this.myUser.id).users_name;
      }
      if (!this.chat.chat.conversation_picture_url) {
        this.chat.chat.conversation_picture_url = this.chat.participants.find(part => part.users_id !== this.myUser.id).user_picture_url;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ionViewWillEnter() {
    this.auth.user.pipe(take(1), switchMap(user => {
      this.myUser = user;
      return this.route.paramMap;
    }))
        .subscribe(paramMap => {
        });
  }
  //
  // ionViewWillLeave() {
  //   clearInterval(this.interval);
  // }
  //
  // sendMsg() {
  //   if (this.mailedUserId.trim() === '') {
  //     return;
  //   }
  //   this.chatService.sendMsg(this.mailedUserId.trim(), this.messageValue).subscribe(responseData => {
  //     this.messageValue = '';
  //     this.chat = responseData;
  //     this.messagesArr = this.chat.chat.messages;
  //   });
  // }
  //
  // loadMsgs() {
  //   this.chatService.loadChat(this.mailedUserId).subscribe(chatResponse => {
  //     if (chatResponse.chat !== null) {
  //       this.chat = chatResponse;
  //       this.messagesArr = this.chat.chat.messages;
  //     }
  //   });
  //   }

}
