import {Component, Input, OnInit} from '@angular/core';
import {ChatPreview} from '../../models/chatPreview.model';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-preview-chat',
  templateUrl: './preview-chat.component.html',
  styleUrls: ['./preview-chat.component.scss'],
})
export class PreviewChatComponent implements OnInit {
@Input() chat: ChatPreview;
  lastMsgDate: Date;
  myUser: User;
  userSub: Subscription;
  serverUrl = environment.url;


 constructor(private auth: AuthService) { }

  ngOnInit() {
   this.userSub = this.auth.user.subscribe(user => {
     this.myUser = user;
       this.lastMsgDate = new Date(this.chat.created_at);
       if (this.chat.conversation_name===null) {
          this.chat.conversation_name = this.chat.participants.find(part => (part.users_id !== this.myUser.id)).users_name;
       }
       if (this.chat.conversation_picture_url===null) {
         this.chat.conversation_picture_url = this.chat.participants.find(part => part.users_id !== this.myUser.id).user_picture_url;
       }
   });
  }

}
