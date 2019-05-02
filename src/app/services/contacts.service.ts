import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {Observable, Observer} from 'rxjs';
import {SimpleAlertService} from './simple-alert.service';
import { Contacts, Contact, ContactField, ContactName, ContactFindOptions } from '@ionic-native/contacts/ngx';
import {SearchService} from './search.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private loadingCtrl: LoadingController
              , private alert: SimpleAlertService
              , private contacts: Contacts
              , private search: SearchService ) { }

  loadContacts() {
    return Observable.create((observer: Observer<any>) => {
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
                  observer.next(searchResponse);
                  loadingEl.dismiss();
                }, error1 => {
                  observer.error(error1);
                  loadingEl.dismiss();
                  this.alert.showAlert('Error!', error1);
                });
              }).catch(() => {
                observer.error('error');
            loadingEl.dismiss();
            this.alert.showAlert('Error!', 'An error has ocurred loading the contacts');
          });
        });
    });
  }
}
