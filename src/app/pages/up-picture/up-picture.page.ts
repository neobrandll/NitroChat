import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ImageService} from '../../services/image.service';
import {EditProfileService} from '../../services/edit-profile.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';
import '@ionic/pwa-elements';
import {CameraResultType, CameraSource, Capacitor, Plugins} from '@capacitor/core';

@Component({
  selector: 'app-up-picture',
  templateUrl: './up-picture.page.html',
  styleUrls: ['./up-picture.page.scss'],
})
export class UpPicturePage implements OnInit {
  form: FormGroup;
  @ViewChild('slider', {read: ElementRef })slider: ElementRef;
  @Input() messageValue: string;
  showPreview = false;
  selectedImage: string;
  constructor(private imageService: ImageService
      , private router: Router,
              private modalController: ModalController) { }

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  zoom(zoomIn: boolean) {
    const zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
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
          this.selectedImage = image.base64Data;
          this.showPreview = true;
          this.onImagePicked(image.base64Data);
        })
        .catch(error => {
          console.log(error, 'canceled');
          this.cancelEvent();
          return false;
        });
  }



  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null)
    });
    this.onPickImage();
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
  }

  onCancel() {
    this.modalController.dismiss({
      'result': 'cancel'
    });
  }

  cancelEvent() {
    setTimeout(() => {
      this.onCancel();
    }, 300);
  }
}
