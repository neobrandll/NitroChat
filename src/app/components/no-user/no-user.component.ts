import {Component, Input, OnInit} from '@angular/core';
import {NotUser} from '../../models/searchUser.model';
import {environment} from '../../../environments/environment';
import {SmsService} from '../../services/sms.service';


@Component({
  selector: 'app-no-user',
  templateUrl: './no-user.component.html',
  styleUrls: ['./no-user.component.scss'],
})
export class NoUserComponent implements OnInit {
  @Input() user: NotUser;
  serverUrl = environment.url;
  constructor(private smsService: SmsService) { }

  ngOnInit() {}

  sendInvitation() {
    this.smsService.send(`0${this.user.phoneNumber}`
        , 'Check out NitroChat, the most exciting app ever! Get it for free in your app store.');
  }

}
