import { Component, OnInit } from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  isMine: boolean;
  constructor(private popOver: PopoverController, private navParams: NavParams) { }

  ngOnInit() {
    this.isMine = this.navParams.get('isMine');
  }
  onUpdate() {
    this.popOver.dismiss({result: 'update'});
  }

  onDelete() {
    this.popOver.dismiss({result: 'delete'});
  }
}
