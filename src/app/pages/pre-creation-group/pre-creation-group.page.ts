import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';
import {NewGroupService} from '../../services/new-group.service';

@Component({
  selector: 'app-pre-creation-group',
  templateUrl: './pre-creation-group.page.html',
  styleUrls: ['./pre-creation-group.page.scss'],
})
export class PreCreationGroupPage implements OnInit {
  groupName = '';
  groupPictureUrl = '../../../assets/imgs/nopic.png';
  typeConversationId: number;
  typeConversation: string;
  constructor(private route: ActivatedRoute, private newGroupService: NewGroupService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.typeConversationId = +paramMap.get('typeConversation');
      this.typeConversation = +paramMap.get('typeConversation') === 2 ? 'Group' : 'Channel';
    });
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      console.log('camera not available');
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      // height: 320,
      width: 600,
      resultType: CameraResultType.Base64
    })
        .then(image => {
          this.groupPictureUrl = image.base64Data;
        })
        .catch(error => {
          console.log(error, 'canceled');
          return false;
        });
  }

  goToSelectP() {
    const attachment = this.groupPictureUrl === '../../../assets/imgs/nopic.png' ? null : this.groupPictureUrl;
    const preGroup = {
      name: this.groupName,
      attachment: attachment
    };
    this.newGroupService.setGroup(preGroup);
    this.router.navigate(['/new-group', this.typeConversationId]);
  }

}
