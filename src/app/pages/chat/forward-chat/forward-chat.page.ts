import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs';
import {SearchResponse} from '../../../models/searchUser.model';
import {User} from '../../../models/user.model';
import {ContactsService} from '../../../services/contacts.service';
import {switchMap, tap} from 'rxjs/operators';
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
  selectedUsers = [];
  filterUsers = { users: []};
  constructor(private route: ActivatedRoute, private contactsService: ContactsService, private auth: AuthService) { }

  ngOnInit() {
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

  onSelected(userId: number) {
    this.selectedUsers.push(userId);
  }

  onUnselected(userId: number) {
    this.selectedUsers = this.selectedUsers.filter(id => userId !== id );
  }

}
