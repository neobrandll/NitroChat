import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Socket } from 'ngx-socket-io';
import {HeadersService} from './../../services/headers.service';
import {AuthService} from './../../services/auth.service';
import {environment} from '../../../environments/environment';
import {switchMap, take} from 'rxjs/operators';
import {ChatService} from './../../services/chat.service';
import {Subscription, TimeInterval} from 'rxjs';
import {User} from './../../models/user.model';
import {Participant} from './../../models/chatPreview.model';
import {Conversation} from './../../models/Conversation.model';
import { Observable, Observer } from 'rxjs';
import {DetailsModalPage} from '../details-modal/details-modal.page';
import {PreviewImagePage} from '../preview-image/preview-image.page';
import {ModalController, NavController} from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

	userSub: Subscription;
	myUser: User;
	chatId: number;
  chat: Conversation;
  serverUrl = environment.url;
  participants: Participant[];
  chatRoom = 'chat ';
  target: number[];
  isDisabled: boolean;
  typeUser: number;


  constructor(private route: ActivatedRoute,
  				private socket: Socket,
  				private headers: HeadersService,
  				private chatService: ChatService,
              private auth: AuthService,
    private modalCtrl: ModalController,
    private router: Router,
              private navCtrl: NavController) {}


  ngOnInit() {
   /*this.userSub = this.auth.user.pipe(switchMap(user => {
       this.myUser = user;
       return this.route.params;
   }), switchMap(params => {
       this.chatId = params.chatId;
       const header = this.headers.getHeaders();
       return this.chatService.getChatData(this.chatId, header);
   })).subscribe(chatData => {
       this.chat = chatData;
       if (!this.chat.chat.conversation_name && this.chat.chat.type_conversation_id === 1) {
           this.chat.chat.conversation_name = this.chat.participants.find(part => part.users_id !== this.myUser.id).users_name;
       }
       if (!this.chat.chat.conversation_picture_url && this.chat.chat.type_conversation_id === 1 ) {
           this.chat.chat.conversation_picture_url = this.chat.participants.find(part => part.users_id !== this.myUser.id).user_picture_url;
       }
   });
*/


  }

	  ionViewWillEnter() {
    this.userSub = this.auth.user.pipe(switchMap(user => {
        this.myUser = user;
        return this.route.paramMap;
    }), switchMap(params => {
        this.chatId = +params.get('chatId');

        return this.chatService.getChatData(this.chatId, this.headers.getHeaders());
    })).subscribe(r => {
        this.chat = r.body;
        this.isDisabled = this.chat.participants.find(participant => participant.users_id === this.myUser.id).isDisabled;
        this.participants = this.chat.participants;
        this.target = this.chat.participants.map(el => {
          if (el.users_id === this.myUser.id){
            this.typeUser = el.type_users_id;
            return null;
          } else {
            return el.users_id;
          }
        })
        this.target = this.target.filter(part => part !== null);
        console.log(this.chat);
        console.log(this.isDisabled);
        console.log(this.target);
      if (!this.chat.chat.conversation_name && this.chat.chat.type_conversation_id === 1) {
        this.chat.chat.conversation_name = this.chat.participants.find(part => part.users_id !== this.myUser.id).users_name;
      }
      if (!this.chat.chat.conversation_picture_url && this.chat.chat.type_conversation_id === 1) {
        this.chat.chat.conversation_picture_url = this.chat.participants.find(part => part.users_id !== this.myUser.id).user_picture_url;
      }
      });
	  }


    makeNewAdmin(target) {
      this.socket.emit('give-admin',{
        chatId: this.chatId,
        targetId: target,
        userId: this.myUser.id
      });
        this.navCtrl.pop();
    }

//  NEW NAME MUST BE CORRECTED
    updateGroupName (newName: string) {
      this.socket.emit('change-group-name',{
        chatId: this.chatId,
        userId: this.myUser.id,
        newName: newName
      });

    }

    async previewImg() {
      if(this.chat.chat.conversation_picture_url ) {
          const modal = await this.modalCtrl.create({
              component: PreviewImagePage,
              componentProps: {image: this.chat.chat.conversation_picture_url}
          });
          await modal.present();
      } else {
            this.changePicture();
      }
    }
    changePicture() {
        if (this.chat.chat.type_conversation_id !== 1) {
            this.router.navigateByUrl(`update-chat-picture/${this.chatId}`);
        }
    }


    deleteMember(target) {
      this.socket.emit('delete-group-member',{
        chatId: this.chatId,
        targetId: target,
        userId: this.myUser.id
      });
        this.navCtrl.pop();
    }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: DetailsModalPage,
      componentProps: { Name: this.chat.chat.conversation_name }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.result === 'ok') {
        this.chat.chat.conversation_name = data.Name;
        this.updateGroupName(data.Name);
    }
  }

  leaveGroup(chatId, userId) {
    this.chatService.getOutOfGroup(chatId, userId, this.headers.getHeaders()).subscribe(results => {
      this.router.navigateByUrl(`home`);
    });
  }

  goToProfile(target){
    this.router.navigateByUrl(`details/${target}`);
  }


}
