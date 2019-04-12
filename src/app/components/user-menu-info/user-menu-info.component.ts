import {AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-menu-info',
  templateUrl: './user-menu-info.component.html',
  styleUrls: ['./user-menu-info.component.scss'],
})
export class UserMenuInfoComponent implements OnInit, OnDestroy {
 serverUrl = environment.url;
 user: User;
 userSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.userSub =  this.authService.user.subscribe(userdata => {
     this.user = userdata;
   });
  }


    ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
