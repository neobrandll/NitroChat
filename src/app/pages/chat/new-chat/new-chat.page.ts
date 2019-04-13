import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {SearchService} from '../../../services/search.service';


@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.scss'],
})
export class NewChatPage implements OnInit {
  serverUrl = environment.url;
  inputValue: string;
  userArray = [];
  alreadySearched = false;
  myUser: User;
  constructor(private http: HttpClient, private auth: AuthService,
              private search: SearchService) { }


  searchHandler() {
    const searchValue = this.inputValue.trim();
    if (searchValue !== '') {
      this.search.searchUsers(searchValue.toLocaleLowerCase()).subscribe( searchResponse => {
        this.userArray = searchResponse.data;
        this.alreadySearched = true;
      });
    } else {
      this.userArray = [];
    }
  }

  ngOnInit() {
    this.auth.user.pipe(take(1)).subscribe(user => {
      this.myUser = user;
    });
    this.search.searchAllUsers().subscribe( searchResponse => {
      this.userArray = searchResponse.data;
      this.alreadySearched = true;
    });
  }
}
