import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Socket } from 'ngx-socket-io';
import {HeadersService} from './../../services/headers.service';
import {environment} from '../../../environments/environment';
import {ChatService} from './../../services/chat.service';
import {Subscription, TimeInterval} from 'rxjs';
import {User} from './../../models/user.model';
import { Observable, Observer } from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

	newAdmin: Subscription;
	newMember: Subscription;
	dltMember: Subscription;
	newPhoto: Subscription;
	newName: Subscription;
	userSub: Subscription;
	myUser: User;
	chatId: number;

  constructor(private route: ActivatedRoute,
  				private socket: Socket,
  				private headers: HeadersService,
  				private http: ChatService,
              private auth: AuthService) {
  			this.newAdmin = this.getNewAdmins().subscribe(results => {});
  			this.newMember = this.getNewMembers().subscribe(results => {});
  			this.dltMember = this.getDeletedMembers().subscribe(results => {});
  			this.newPhoto = this.getUpdatedPicture().subscribe(results => {});
  			this.newName = this.getUpdatedName().subscribe(results => {});
  				 }

  ngOnInit() {
   this.userSub = this.auth.user.subscribe(user => {
      this.myUser = user;
    });
    this.route.params.subscribe(params => {
      this.chatId = params.id;
      });
  }

	  ionViewWillEnter(){

	  }

	  getNewAdmins(){
      return Observable.create((observer: Observer<any>) => {
          this.socket.on('new-admin', data => {
              observer.next(data);
          });
      });
	  }

	  getNewMembers(){
      return Observable.create((observer: Observer<any>) => {
          this.socket.on('new-member', data => {
              observer.next(data);
          });
      });
	  }

	  getDeletedMembers(){
      return Observable.create((observer: Observer<any>) => {
          this.socket.on('member-deleted', data => {
              observer.next(data);
          });
      });
	  }

	  getUpdatedPicture(){
      return Observable.create((observer: Observer<any>) => {
          this.socket.on('group-profile-updated', data => {
              observer.next(data);
          });
      });
	  }

	  getUpdatedName(){
      return Observable.create((observer: Observer<any>) => {
          this.socket.on('name-changed', data => {
              observer.next(data);
          });
      });
	  }


	  

}
