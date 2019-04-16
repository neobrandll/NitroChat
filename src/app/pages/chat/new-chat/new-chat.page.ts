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


@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.scss'],
})
export class NewChatPage implements OnInit, OnDestroy {
  serverUrl = environment.url;
  inputValue: string;
  userArray: any;
  alreadySearched = false;
  myUser: User;
  userSub: Subscription;
  constructor(private http: HttpClient, private auth: AuthService,
              private search: SearchService,
              private contacts: Contacts,
              private loadingCtrl: LoadingController,
              private alert: SimpleAlertService) { }


  searchHandler() {
    const searchValue = this.inputValue.trim();
    if (searchValue !== '') {
      this.loadingCtrl
          .create({keyboardClose: false, message: 'Loading contacts...'})
          .then(loadingEl => {
            loadingEl.present();
            const options = new ContactFindOptions();
            options.multiple = true;
            options.hasPhoneNumber = true;
            options.filter = `${searchValue}`;
            this.contacts.find(['*'], options)
                .then(res => {
                  this.search.searchUsers(searchValue.toLocaleLowerCase(), res).subscribe(searchResponse => {
                    this.userArray = searchResponse;
                    this.alreadySearched = true;
                    loadingEl.dismiss();
                  }, error1 => {
                    loadingEl.dismiss();
                    this.alert.showAlert('Error!', error1);
                  });
                }).catch(() => {
              loadingEl.dismiss();
              this.alert.showAlert('Error!', 'An error has ocurred loading the contacts');
            });
          });
    } else {
      this.userArray = {users: [], notUsers: []};
    }
  }

  ngOnInit() {
    this.loadingCtrl
        .create({ keyboardClose: true, message: 'Loading contacts...' })
        .then(loadingEl => {
          loadingEl.present();
    const options = new ContactFindOptions();
    options.multiple = true;
    options.hasPhoneNumber = true;
    this.contacts.find(['*'], options)
        .then(res => {
          this.search.searchAllUsers(res).subscribe( searchResponse => {
            this.userArray = searchResponse;
            console.log(this.userArray);
            this.alreadySearched = true;
            loadingEl.dismiss();
          }, error1 => {
            loadingEl.dismiss();
            this.alert.showAlert('Error!', error1);
          });
    }).catch(() => {
      loadingEl.dismiss();
      this.alert.showAlert('Error!', 'An error has ocurred loading the contacts');
    });
        });
    this.userSub = this.auth.user.subscribe(user => {
      this.myUser = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}


