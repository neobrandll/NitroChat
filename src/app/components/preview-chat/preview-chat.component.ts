import {Component, Input, OnInit} from '@angular/core';
import {ChatPreview} from '../../models/chatPreview.model';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PopoverComponent} from '../popover/popover.component';
import {PopoverController} from '@ionic/angular';

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
  selected = false;


 constructor(private auth: AuthService, private popoverController: PopoverController) { }

  ngOnInit() {
   this.userSub = this.auth.user.subscribe(user => {
     this.myUser = user;
       this.lastMsgDate = new Date(this.chat.created_at);
       if (!this.chat.conversation_name) {
          this.chat.conversation_name = this.chat.participants.find(part => part.users_id !== this.myUser.id).users_name;
       }
       if (!this.chat.conversation_picture_url) {
         this.chat.conversation_picture_url = this.chat.participants.find(part => part.users_id !== this.myUser.id).user_picture_url;
       }
   });
  }

 


        async onPressed() {
            this.selected = true;
            const popover = await this.popoverController.create({
                component: PopoverComponent, componentProps: {isMine: true, isPreview: true}
            });
            await popover.present();
            const { data } = await popover.onDidDismiss();
            if (data) {
                if (data.result === 'delete') {
                     
                }
            }
            this.selected = false;
        }

}
