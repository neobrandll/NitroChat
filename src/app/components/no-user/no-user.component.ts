import {Component, Input, OnInit} from '@angular/core';
import {NotUser, SearchedUser} from '../../models/searchUser.model';
import {environment} from '../../../environments/environment';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-no-user',
  templateUrl: './no-user.component.html',
  styleUrls: ['./no-user.component.scss'],
})
export class NoUserComponent implements OnInit {
  @Input() user: NotUser;
  serverUrl = environment.url;
  constructor(private sms: SMS) { }

  ngOnInit() {}

  sendInvitation() {
    this.sms.send(`0${this.user.phoneNumber}`, 'Check out NitroChat, the most exciting app ever!. Get it for free in your app store',
        {android: {intent: 'INTENT'}})
        .then(data => {
          console.log(data);
        }).catch(error => console.log(error));
  }

}
