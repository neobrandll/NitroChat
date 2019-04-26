import {Component, ElementRef, Input, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ImageService} from '../../services/image.service';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {CameraResultType, CameraSource, Capacitor, Plugins} from '@capacitor/core';
import {DomSanitizer} from '@angular/platform-browser';

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
  selectedImage: any;
  constructor(private imageService: ImageService
      , private router: Router,
              private modalController: ModalController,
              private sanitization: DomSanitizer) { }

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
          this.selectedImage = this.sanitization.bypassSecurityTrustResourceUrl(image.base64Data);
          this.showPreview = true;
          this.onImagePicked(image.base64Data.replace('unsafe:', '').replace(/(\r\n\t|\n|\r\t)/gm, ''));
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

  onImagePicked(imageData: any) {
        this.form.patchValue({ image: imageData });
  }

  onSubmit() {
    if (!this.form.get('image').value) {
      return;
    }
    this.modalController.dismiss({
      'result': 'ok',
      'image': this.form.get('image').value,
      'message': this.messageValue
    });
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
