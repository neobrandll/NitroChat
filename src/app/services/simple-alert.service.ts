import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SimpleAlertService {

  constructor(private alertCtrl: AlertController, private router: Router) { }

  showAlert( header: string , message: string, button?) {
    let buttonContent;
    if (button) {
      buttonContent = button;
    } else {
      buttonContent = 'Okay';
    }
    this.alertCtrl
        .create({
          header: header,
          message: message,
          buttons: [buttonContent]
        })
        .then(alertEl => alertEl.present());
  }
}
