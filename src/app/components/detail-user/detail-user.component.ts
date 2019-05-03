import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Participant} from '../../models/chatPreview.model';
import {environment} from '../../../environments/environment';
import {DetailPopOverComponent} from './../detail-pop-over/detail-pop-over.component';
import {ModalController, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit {
    @Input() user: Participant;
    @Input() loggeduser: number;
    serverUrl = environment.url;
    selected: boolean = false;
    @Output() adminEmit = new EventEmitter<number>();
    @Output() deleteEmit = new EventEmitter<number>();
    @Output() profileEmit = new EventEmitter<number>();

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  deleteMember(){
  this.deleteEmit.emit(this.user.users_id);
  }

  makeAdmin(){
  this.adminEmit.emit(this.user.users_id);
  }

  goToProfile(){
  this.profileEmit.emit(this.user.users_id);
  }
 
 async onPressed() {
    this.selected = true;
    const popover = await this.popoverController.create({
      component: DetailPopOverComponent, componentProps: {isAdmin: (this.loggeduser === 2), targetIsAdmin: (this.user.type_users_id === 2)}
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data) {
      switch (data.result) {
        case 'delete member': this.deleteMember();
        break;
        case 'go to profile': this.goToProfile();
        break;
        case 'make admin': this.makeAdmin();
        break;
      }
    }
    this.selected = false;
  }
}
