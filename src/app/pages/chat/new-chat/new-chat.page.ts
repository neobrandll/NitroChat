import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {SearchService} from '../../../services/search.service';
import { Contacts, Contact, ContactField, ContactName, ContactFindOptions } from '@ionic-native/contacts/ngx';


@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.scss'],
})
export class NewChatPage implements OnInit {
  serverUrl = environment.url;
  inputValue: string;
  userArray: any;
  alreadySearched = false;
  myUser: User;
  constructor(private http: HttpClient, private auth: AuthService,
              private search: SearchService,
              private contacts: Contacts) { }


  searchHandler() {
    const searchValue = this.inputValue.trim();
    if (searchValue !== '') {
      this.search.searchUsers(searchValue.toLocaleLowerCase()).subscribe( searchResponse => {
        this.userArray = searchResponse.data;
        this.alreadySearched = true;
      });
    } else {
      this.userArray = {users: [], notUsers: []};
    }
  }

  ngOnInit() {
    const options = new ContactFindOptions();
    options.multiple = true;
    this.contacts.find(['*'], options)
        .then(res => {
          this.search.searchAllUsers(res).subscribe( searchResponse => {
            this.userArray = searchResponse;
            console.log(this.userArray);
            this.alreadySearched = true;
          });
    });
    this.auth.user.pipe(take(1)).subscribe(user => {
      this.myUser = user;
    });
  }
}
