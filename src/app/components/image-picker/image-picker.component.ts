import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string | File>();
  @Input() showPreview = false;
  selectedImage: string;


  constructor() {}

  ngOnInit() {
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
          this.imagePick.emit(image.base64Data);
        })
        .catch(error => {
          console.log(error, 'canceled');
          return false;
        });
  }
}
