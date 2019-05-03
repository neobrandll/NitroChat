import { Component, OnInit } from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  isMine: boolean;
  isPreview: boolean;
  canBeDeleted: boolean;
  isGroup: boolean;
  isGroupAdmin: boolean;
  constructor(private popOver: PopoverController, private navParams: NavParams) { }

  ngOnInit() {
    this.isMine = this.navParams.get('isMine');
    this.isPreview = this.navParams.get('isPreview');
    this.canBeDeleted = this.navParams.get('canBeDeleted');
    this.isGroup = this.navParams.get('isGroup');
    this.isGroupAdmin = this.navParams.get('isGroupAdmin');
  }
  onUpdate() {
    this.popOver.dismiss({result: 'update'});
  }

  onForward(){
    this.popOver.dismiss({result: 'forward'});
  }

  onDelete() {
    this.popOver.dismiss({result: 'delete'});
  }

  onLeaveGroup() {
  this.popOver.dismiss({result:'leave group'});
  }

  onDeleteGroup(){
  this.popOver.dismiss({result:'delete group'});
  }
}
