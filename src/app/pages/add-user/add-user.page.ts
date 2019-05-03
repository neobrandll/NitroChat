import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchResponse} from '../../models/searchUser.model';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactsService} from '../../services/contacts.service';
import {NewGroupService} from '../../services/new-group.service';
import {AuthService} from '../../services/auth.service';
import {switchMap, tap} from 'rxjs/operators';
import {NavController} from '@ionic/angular';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit, OnDestroy {
  typeConversation: number;
  inputValue: string;
  userArray: SearchResponse;
  alreadySearched = false;
  myUser: User;
  userSub: Subscription;
  showAll = true;
  chatId: number;
  selectedUsers = [];
  filterUsers = { users: []};
  constructor(private route: ActivatedRoute,
              private contactsService: ContactsService,
              private newGroupService: NewGroupService,
              private router: Router,
              private auth: AuthService,
              private socket: Socket,
              private navCtlr: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.chatId = +paramMap.get('chatId');
      this.userSub = this.auth.user.pipe(switchMap(user => {
        this.myUser = user;
        return this.contactsService.loadContacts();
      }), tap(searchResponse => {
        // @ts-ignore
        this.userArray = searchResponse;
        console.log(this.userArray);
        this.showAll = true;
        this.alreadySearched = true;
      })).subscribe();
    });
  }

  searchHandler() {
    const searchValue = this.inputValue.trim();
    if (searchValue !== '') {
      this.showAll = false;
      this.filterUsers.users = this.userArray.users.filter(el => el.displayName.toUpperCase().includes(searchValue.toUpperCase()) );
    } else {
      this.showAll = true;
    }
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSelected(data: any) {
    this.selectedUsers.push(data.id);
  }

  onUnselected(data: any) {
    this.selectedUsers = this.selectedUsers.filter(id => data.id !== id );
  }

    addNewMember() {
      this.socket.emit('add-group-member', {
          chatId: this.chatId,
          targets: this.selectedUsers,
          userId: this.myUser.id
      });
      this.navCtlr.pop();
  }


}
