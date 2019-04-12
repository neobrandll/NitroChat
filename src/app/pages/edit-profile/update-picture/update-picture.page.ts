import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ImageServiceService} from '../../../services/image-service.service';
import {EditProfileService} from '../../../services/edit-profile.service';
import {take} from 'rxjs/operators';
import {PostServiceService} from '../../../services/post-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-picture',
  templateUrl: './update-picture.page.html',
  styleUrls: ['./update-picture.page.scss'],
})
export class UpdatePicturePage implements OnInit {
  form: FormGroup;
  constructor(private imageService: ImageServiceService
              , private editService: EditProfileService
              , private postService: PostServiceService
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
      this.postService.fetchPosts().subscribe();
      this.router.navigate(['/home']);
    });
  }
}
