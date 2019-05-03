import {Component, Input, OnInit} from '@angular/core';
import {Participant} from '../../models/chatPreview.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit {
    @Input() user: Participant;
    serverUrl = environment.url;
  constructor() { }

  ngOnInit() {}

}
