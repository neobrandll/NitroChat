import { Component, OnInit } from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-detail-pop-over',
  templateUrl: './detail-pop-over.component.html',
  styleUrls: ['./detail-pop-over.component.scss'],
})
export class DetailPopOverComponent implements OnInit {

	targetIsAdmin: boolean;
	isAdmin: boolean;
  constructor(private popOver: PopoverController, private navParams: NavParams) {
  	this.isAdmin = this.navParams.get('isAdmin');
  	this.targetIsAdmin = this.navParams.get('targetIsAdmin');
   }

  ngOnInit() {}

  onDeleteMember(){
	this.popOver.dismiss({result: 'delete member'});
  }

  onMakeAdmin(){
	this.popOver.dismiss({result: 'make admin'});
  }

  onGoToProfile(){
    this.popOver.dismiss({result: 'go to profile'});
  }

}
