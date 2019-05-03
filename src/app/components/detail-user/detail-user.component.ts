import {Component, Input, OnInit} from '@angular/core';
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
    serverUrl = environment.url;
    selected: boolean = false;
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  deleteMember(){

  }

  makeAdmin(){

  }

  goToProfile(){

  }
 
 async onPressed() {
    this.selected = true;
    const popover = await this.popoverController.create({
      component: DetailPopOverComponent, componentProps: {}
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
