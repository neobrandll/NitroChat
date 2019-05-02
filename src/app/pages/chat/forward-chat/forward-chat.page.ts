import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {SearchService} from '../../../services/search.service';
import {Subscription} from 'rxjs';
import {LoadingController} from '@ionic/angular';
import {SimpleAlertService} from '../../../services/simple-alert.service';
import {SearchResponse} from '../../../models/searchUser.model';


@Component({
  selector: 'app-forward-chat',
  templateUrl: './forward-chat.page.html',
  styleUrls: ['./forward-chat.page.scss'],
})
export class ForwardChatPage implements OnInit, OnDestroy {
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
              private alert: SimpleAlertService) { }


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
            this.showAll = true;
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


