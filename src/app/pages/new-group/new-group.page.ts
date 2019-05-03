import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchResponse} from '../../models/searchUser.model';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs';
import {ContactsService} from '../../services/contacts.service';
import {NewGroupService} from '../../services/new-group.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.page.html',
  styleUrls: ['./new-group.page.scss'],
})
export class NewGroupPage implements OnInit, OnDestroy {
  typeConversation: number;
  inputValue: string;
  userArray: SearchResponse;
  alreadySearched = false;
  myUser: User;
  userSub: Subscription;
  showAll = true;
  selectedUsers: number[];
  filterUsers = { users: []};
  constructor(private route: ActivatedRoute,
              private contactsService: ContactsService,
              private newGroupService: NewGroupService,
              private router: Router
              ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.typeConversation = +paramMap.get('typeConversation');
      this.contactsService.loadContacts().subscribe(searchResponse => {
        this.userArray = searchResponse;
        this.showAll = true;
        this.alreadySearched = true;
      });
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

  onSelected(userId: number) {
    this.selectedUsers.push(userId);
  }

  onUnselected(userId: number) {
    this.selectedUsers = this.selectedUsers.filter(id => userId !== id );
  }
  createGroup() {
  this.newGroupService.group.subscribe(preGroup => {
      let safeAttachment: string;
      if (preGroup.attachment) {
          safeAttachment = preGroup.attachment.replace('unsafe:', '').replace(/(\r\n\t|\n|\r\t)/gm, '');
      } else {
          safeAttachment = preGroup.attachment;
      }
    const newGroup = {
      type: this.typeConversation,
      users: this.selectedUsers,
      attachment: safeAttachment,
      converName: preGroup.name
    };
      this.newGroupService.createGroup(newGroup).subscribe(response => {
          const chatId = response.conversations_id;
          this.router.navigate(['/chat', chatId]);
      });

  });
  }

}
