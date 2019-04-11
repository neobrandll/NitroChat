import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.scss'],
})
export class NewChatPage implements OnInit {
  // inputValue: string;
  // serverUrl: string;
  // userArray = [];
  // alreadySearched = false;
  // myUser: User;
  // constructor(private http: HttpClient, private auth: AuthService,
  //             private discoverService: DiscoverService) { }
  //
  //
  // searchHandler() {
  //   const searchValue = this.inputValue.trim();
  //   if (searchValue !== '') {
  //     this.discoverService.searchUser(searchValue).subscribe( userArr => {
  //       this.userArray = userArr;
  //       this.alreadySearched = true;
  //     });
  //   } else {
  //     this.userArray = [];
  //   }
  // }

  ngOnInit() {
    // this.auth.user.pipe(take(1)).subscribe(user => {
    //   this.myUser = user;
    // });
    // this.serverUrl = environment.url;
  }
}
