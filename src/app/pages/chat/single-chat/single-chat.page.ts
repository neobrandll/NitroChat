import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatService} from '../../../services/chat.service';
import {UserProfile} from '../../../models/userProfile.model';
import {ChatMessage, ChatPostResponse} from '../../../models/chat.model';
import {TimeInterval} from 'rxjs';
import {User} from '../../../models/user.model';
import {AuthService} from '../../auth/auth.service';
import {switchMap, take} from 'rxjs/operators';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.page.html',
  styleUrls: ['./single-chat.page.scss'],
})
export class SingleChatPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private chatService: ChatService,
              private auth: AuthService,
              private router: Router) { }
mailedUserId: string;
mailedUser: UserProfile;
messageValue: string;
myUser: User;
interval;
chat: ChatPostResponse;
messagesArr: ChatMessage[];



  ngOnInit() {
  }

  ionViewWillEnter() {
    this.auth.user.pipe(take(1), switchMap(user =>{
      this.myUser = user;
      return this.route.paramMap;
    }))
    .subscribe(paramMap => {
      this.mailedUserId = paramMap.get('mailedUser');
      if (this.mailedUserId === this.myUser.id) {
        this.router.navigate(['/home/tabs/chat']);
      }
      this.chatService.mailedUser(this.mailedUserId).subscribe(user => {
        this.mailedUser = user;
      });
      this.loadMsgs();
      this.interval = setInterval(() => {
        this.loadMsgs();
      }, 2000);
    });
  }

  ionViewWillLeave() {
    clearInterval(this.interval);
  }

  sendMsg() {
    if (this.mailedUserId.trim() === '') {
      return;
    }
    this.chatService.sendMsg(this.mailedUserId.trim(), this.messageValue).subscribe(responseData => {
      this.messageValue = '';
      this.chat = responseData;
      this.messagesArr = this.chat.chat.messages;
    });
  }

  loadMsgs() {
    this.chatService.loadChat(this.mailedUserId).subscribe(chatResponse => {
      if (chatResponse.chat !== null) {
        this.chat = chatResponse;
        this.messagesArr = this.chat.chat.messages;
      }
    });
    }

}
