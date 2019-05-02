import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {SearchService} from '../../../services/search.service';
import { Contacts, Contact, ContactField, ContactName, ContactFindOptions } from '@ionic-native/contacts/ngx';
import {Subscription} from 'rxjs';
import {LoadingController} from '@ionic/angular';
import {SimpleAlertService} from '../../../services/simple-alert.service';
import {SearchResponse} from '../../../models/searchUser.model';
import {ContactsService} from '../../../services/contacts.service';


@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.scss'],
})
export class NewChatPage implements OnInit, OnDestroy {
  serverUrl = environment.url;
  inputValue: string;
  userArray: SearchResponse;
  alreadySearched = false;
  myUser: User;
  userSub: Subscription;
  showAll = true;
  filterUsers = { users: [], notUsers: []};
  constructor(private http: HttpClient, private auth: AuthService,
              private search: SearchService,
              private loadingCtrl: LoadingController,
              private alert: SimpleAlertService,
              private contactsService: ContactsService
  ) { }


  searchHandler() {
    const searchValue = this.inputValue.trim();
    if (searchValue !== '') {
      this.showAll = false;
       this.filterUsers.users = this.userArray.users.filter(el => el.displayName.toUpperCase().includes(searchValue.toUpperCase()) );
        this.filterUsers.notUsers = this.userArray.notUsers.filter(el => el.displayName.toUpperCase().includes(searchValue.toUpperCase()));
    } else {
      this.showAll = true;
    }
  }

  ngOnInit() {
        this.contactsService.loadContacts().subscribe(searchResponse => {
          this.userArray = searchResponse;
          this.showAll = true;
          this.alreadySearched = true;
        });

    this.userSub = this.auth.user.subscribe(user => {
      this.myUser = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}


