import { Injectable } from '@angular/core';
import {BehaviorSubject, from} from 'rxjs';
import {ForwardMessage} from '../models/fwdmessage.model';


@Injectable({
  providedIn: 'root'
})
export class ResendmessageService {

  private resendMessage = new BehaviorSubject<ForwardMessage>(null);


  constructor() { }

   forwardMessage(data: ForwardMessage){
    this.resendMessage.next(data);
  }

  receiveFwdMsg(){
    return this.resendMessage.asObservable();
  }

}
