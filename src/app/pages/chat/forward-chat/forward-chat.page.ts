import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs';
import {SearchResponse} from '../../../models/searchUser.model';
import {User} from '../../../models/user.model';
import {ContactsService} from '../../../services/contacts.service';



@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.page.html',
  styleUrls: ['./new-group.page.scss'],
})
export class NewGroupPage implements OnInit, OnDestroy {
  typeConversation: number;
  inputValue: string;
  userArray: SearchResponse;
  alreadySearched = false;
  myUser: User;
  userSub: Subscription;
  showAll = true;
  selectedUsers: number[];
  filterUsers = { users: []};
  constructor(private route: ActivatedRoute, private contactsService: ContactsService) { }

  ngOnInit() {
      this.contactsService.loadContacts().subscribe(searchResponse => {
        this.userArray = searchResponse;
        this.showAll = true;
        this.alreadySearched = true;
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
