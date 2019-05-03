import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription, TimeInterval} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user.model';
import {Conversation} from '../../../models/Conversation.model';
import {environment} from '../../../../environments/environment';
import {HeadersService} from './../../../services/headers.service';
import {ChatService} from './../../../services/chat.service';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';
import {ModalController, IonContent} from '@ionic/angular';
import {UpdatePicturePage} from '../../edit-profile/update-picture/update-picture.page';
import {UpPicturePage} from '../../up-picture/up-picture.page';
import {PreviewImagePage} from '../../preview-image/preview-image.page';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.page.html',
  styleUrls: ['./single-chat.page.scss'],
})
export class SingleChatPage implements OnInit, OnDestroy {

  @ViewChild(IonContent) content: IonContent;
   messageValue: string;
   myUser: User;
   userSub: Subscription;
   chatId: number;
   messages = [];
   chat: Conversation;
    serverUrl = environment.url;
    chatRoom = 'chat ';
    target: number[];
    attachment: string = null;
    msgConn;
    msgDel;
    updateMsgId = null;
   color: string;
   otherColor: string;
    newAdmin: Subscription;
  newMember: Subscription;
  dltMember: Subscription;
  newPhoto: Subscription;
  newName: Subscription;
   colorArr = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];
    updating = false;
    msgUpd;
    isDisabled: boolean;

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private headers: HeadersService,
              private http: ChatService,
              private socket: Socket,
              private modalController: ModalController) {
    this.msgConn = this.getMessages().subscribe(r => {
    r.isMine = ((r.users_id === this.myUser.id));
    console.log(r);
      this.messages.push(r);
      this.scrollDown();
    });
    this.msgDel = this.deleteMessage().subscribe(r => {
      console.log(r);
      for (let i = 0; i < this.messages.length; i++ ) {
        if (this.messages[i].message_id === r.messageId){
          this.messages.splice(i, 1);
        }
      }
    });
    this.msgUpd = this.updateMessage().subscribe(results => {
        for (let a of this.messages) {
          if (a.message_id === results.message.message_id){
            a.message_body = results.message.message_body;
          }
        }
    });

        this.newAdmin = this.getNewAdmins().subscribe(results => {
          results.message.isMine = ((results.message.users_id === this.myUser.id));
          this.messages.push(results.message);
          this.scrollDown();
        });

        this.newMember = this.getNewMembers().subscribe(results => {
          results.message.isMine = ((results.message.users_id === this.myUser.id));
          this.messages.push(results.message);
          this.scrollDown();
        });
        this.dltMember = this.getDeletedMembers().subscribe(results => {
          results.message.isMine = ((results.message.users_id === this.myUser.id))
          this.messages.push(results.message);
          this.scrollDown();
        });

        this.newPhoto = this.getUpdatedPicture().subscribe(results => {
          this.chat.chat.conversation_picture_url = results.picture;
        });
        
        this.newName = this.getUpdatedName().subscribe(results => {
          results.message.isMine = ((results.message.users_id === this.myUser.id))
          this.messages.push(results.message);
          this.scrollDown();
        });
    }

  ngOnInit() {
  const index = Math.floor(Math.random() * this.colorArr.length) - 1;
   this.color = this.colorArr[index];
   this.colorArr.splice(index, 1);
   this.otherColor =  this.colorArr[Math.floor(Math.random() * this.colorArr.length) - 1];
    this.userSub = this.auth.user.pipe(switchMap(user => {
        this.myUser = user;
        return this.route.params;
    }), switchMap(params => {
        this.chatId = params.id;
        return this.http.getChatData(this.chatId, this.headers.getHeaders());
    })).subscribe(r => {
      //  console.log(r);
        this.chat = r.body;
        this.isDisabled = this.chat.participants.find(participant => participant.users_id === this.myUser.id).isDisabled;
        this.messages = r.body.messages;
        //this.target = this.chat.participants.find(part => part.users_id !== this.myUser.id).users_id;
        this.target = this.chat.participants.map(el => {
          if (el.users_id === this.myUser.id){
            return null;
          } else {
            return el.users_id;
          }
        })
        this.target = this.target.filter(part => part !== null);
      if (!this.chat.chat.conversation_name && this.chat.chat.type_conversation_id === 1) {
        this.chat.chat.conversation_name = this.chat.participants.find(part => part.users_id !== this.myUser.id).users_name;
      }
      if (!this.chat.chat.conversation_picture_url && this.chat.chat.type_conversation_id === 1) {
        this.chat.chat.conversation_picture_url = this.chat.participants.find(part => part.users_id !== this.myUser.id).user_picture_url;
      }
      });
      setTimeout(() => {
          this.scrollDown();
      }, 1000);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.msgDel.unsubscribe();
    this.msgUpd.unsubscribe();
    this.msgConn.unsubscribe();
  }

  ionViewWillEnter() {

  }

    ionViewDidEnter() {
    // this.socket.connect();
    this.scrollDown();
    this.socket.emit('open-chat', {
      room: `${this.chatRoom}${this.chatId}`
    });
  }

    ionViewWillLeave() {
      this.msgConn.unsubscribe();
      this.socket.emit('leave-chat', {room: `${this.chatRoom}${this.chatId}`});
    }


  sendMsg()  {
    console.log(this.target);
    this.socket.emit('send-msg', {
      room: `${this.chatRoom}${this.chatId}`,
      message: this.messageValue,
      targets: this.target,
      id: this.myUser.id,
      chatId: this.chatId,
      attachment: this.attachment,
    });
    this.attachment = null;
    this.messageValue = '';
  }

    getMessages() {
      return Observable.create((observer: Observer<any>) => {
          this.socket.on('get-msg', data => {
              observer.next(data);
          });
      });
  }

  updateMessage() {
    const observable = Observable.create((observer: Observer<any>) => {
      this.socket.on('receive-update', data => {
        observer.next(data);
      });
    });
    return observable;
  }

  //     deleteMessage() {
  //   let observable = new Observable<any>(observer => {
  //     this.socket.on("message-was-deleted", data => {
  //       observer.next(data);
  //     });
  //   });
  //   return observable;
  // }
  deleteMessage() {
  	return Observable.create((observer: Observer<any>) => {
  		this.socket.on('message-was-deleted', data => {
        observer.next(data);
      });
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

  async addPicture() {
    const modal = await this.modalController.create({
      component: UpPicturePage,
      componentProps: {
        'messageValue': this.messageValue,
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.result === 'ok') {
      this.attachment = data.image;
      this.messageValue = data.message;
      this.sendMsg();
    }
  }

  scrollDown() {
  this.content.scrollToBottom();
  }


  startUpdate(message: {body: string, id: number}) {
      this.messageValue = message.body;
      this.updating = true;
      this.updateMsgId = message.id;
  }

    cancelUpdate() {
      this.messageValue = '';
      this.updating = false;
    }

    updateMsg() {
        this.socket.emit('update-msg', {
            room: `${this.chatRoom}${this.chatId}`,
            message: this.messageValue,
            user: `user ${this.target}`,
            id: `${this.myUser.id}`,
            messageId: this.updateMsgId
        });
        this.attachment = null;
        this.messageValue = '';
        this.updateMsgId = null;
        this.updating = false;
    }


        getNewAdmins(){
      return Observable.create((observer: Observer<any>) => {
          this.socket.on('new-admin', data => {
              observer.next(data);
          });
      });
    }

    getNewMembers(){
      return Observable.create((observer: Observer<any>) => {
          this.socket.on('new-member', data => {
              observer.next(data);
          });
      });
    }

    getDeletedMembers(){
      return Observable.create((observer: Observer<any>) => {
          this.socket.on('member-deleted', data => {
              observer.next(data);
          });
      });
    }

    getUpdatedPicture(){
      return Observable.create((observer: Observer<any>) => {
          this.socket.on('group-profile-updated', data => {
              observer.next(data);
          });
      });
    }

    getUpdatedName(){
      return Observable.create((observer: Observer<any>) => {
          this.socket.on('name-changed', data => {
              observer.next(data);
          });
      });
    }

    async previewImg() {
        if (this.chat.chat.conversation_picture_url ) {
            const modal = await this.modalController.create({
                component: PreviewImagePage,
                componentProps: {image: this.chat.chat.conversation_picture_url}
            });
            await modal.present();
        } else {
            return;
        }
    }
}
