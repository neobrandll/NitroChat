import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private sms: SMS) { }

  send(number: string, message: string) {
    this.sms.send(number, message,
        {android: {intent: 'INTENT'}})
        .then(data => {
          console.log(data);
        }).catch(error => console.log(error));
  }
}
