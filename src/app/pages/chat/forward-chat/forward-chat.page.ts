import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs';
import {SearchResponse} from '../../../models/searchUser.model';
import {User} from '../../../models/user.model';
import {ChatService} from '../../../services/chat.service';
import {HeadersService} from '../../../services/headers.service';
import {ContactsService} from '../../../services/contacts.service';
import {ResendmessageService} from '../../../services/resendmessage.service'
import {switchMap, tap} from 'rxjs/operators';
import {Socket} from 'ngx-socket-io';
import {AuthService} from '../../../services/auth.service';



@Component({
  selector: 'app-forward-chat',
  templateUrl: './forward-chat.page.html',
  styleUrls: ['./forward-chat.page.scss'],
})
export class ForwardChatPage implements OnInit, OnDestroy {
  typeConversation: number;
  inputValue: string;
  userArray: SearchResponse;
  alreadySearched = false;
  myUser: User;
  userSub: Subscription;
  showAll = true;
  otherChats;
  selectedUsers = [];
  filterUsers = { users: []};

  message: string;
  attachment: string;
  id: number;
  targets = [];

  constructor(private route: ActivatedRoute, private contactsService: ContactsService, 
    private chatService: ChatService, private headers: HeadersService, private auth: AuthService,
    private forward: ResendmessageService, private socket: Socket) { }

  ngOnInit() {
    this.forward.receiveFwdMsg().subscribe(results=>{
      this.message = results.message;
      this.attachment = results.attachment;
    })
    this.route.paramMap.subscribe(paramMap => {
      this.typeConversation = +paramMap.get('typeConversation');
      this.userSub = this.auth.user.pipe(switchMap(user =>{
        this.myUser = user;
        return this.contactsService.loadContacts();
      }), tap(searchResponse => {
        // @ts-ignore
        this.userArray = searchResponse;
        console.log(this.userArray);
        this.showAll = true;
        this.alreadySearched = true;
        this.chatService.getGroupChats(this.headers.getHeaders()).subscribe(results=>{
          results.body.chats.map(el => {
            this.userArray.users.push({id: el.conversations_id,
              displayName: el.conversation_name,
              picture_url: el.conversation_picture_url,
              phoneNumber: '',
              chatId: el.conversations_id});
          });
        })
      })).subscribe();
    });
  }

  searchHandler() {
    const searchValue = this.inputValue.trim();
    if (searchValue !== '') {
      this.showAll = false;
      this.filterUsers.users = this.userArray.users.filter(el => el.displayName.toUpperCase().includes(searchValue.toUpperCase()) );
    } else {
      this.showAll = true;
    }
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSelected(data) {
    this.selectedUsers.push({user:[data.id],chatId:data.chat});
  }

  onUnselected(data) {
    this.selectedUsers = this.selectedUsers.filter(id => id.chatId !== data.chatId);
  }

  forwardMsg(){
    this.id = this.myUser.id;

    this.socket.emit('fwd-msg', {
      message: this.message,
      attachment: this.attachment,
      id: this.id,
      targets: this.selectedUsers
    })
  }

}
