import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ImageService} from '../../../services/image.service';
import {EditProfileService} from '../../../services/edit-profile.service';

@Component({
  selector: 'app-update-picture',
  templateUrl: './update-picture.page.html',
  styleUrls: ['./update-picture.page.scss'],
})
export class UpdatePicturePage implements OnInit {
  form: FormGroup;
  constructor(private imageService: ImageService
              , private editService: EditProfileService
              , private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null)
    });
  }

  onImagePicked(imageData: string) {
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
    this.editService.updatePicture(this.form.get('image').value).pipe(take(1)).subscribe((data) => {
      this.router.navigate(['/home']);
    });
  }
}
