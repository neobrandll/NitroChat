import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ImageService} from '../../services/image.service';
import {EditProfileService} from '../../services/edit-profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {EditGroupService} from '../../services/edit-group.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-update-chat-picture',
  templateUrl: './update-chat-picture.page.html',
  styleUrls: ['./update-chat-picture.page.scss'],
})
export class UpdateChatPicturePage implements OnInit {
  form: FormGroup;
  chatId: number;
  constructor(private imageService: ImageService
      , private editGroupService: EditGroupService
      , private router: Router
      , private route: ActivatedRoute,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
     this.chatId = +paramMap.get('chatId');
    });
    this.form = new FormGroup({
      image: new FormControl(null)
    });
  }

  onImagePicked(imageData: string) {
    console.log(imageData);
    this.imageService.handleImage(imageData).pipe(take(1)).subscribe(imageFile => {
      if (imageFile) {
        this.form.patchValue({ image: imageFile });
      }
    });
  }

  onSubmit() {
    if (!this.form.get('image').value) {
      return;
    }
    this.editGroupService.updateChatPic(this.form.get('image').value, this.chatId).pipe(take(1)).subscribe((data) => {
      this.navCtrl.pop();
    });
  }
}
