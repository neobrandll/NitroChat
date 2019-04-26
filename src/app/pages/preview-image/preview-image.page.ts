import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.page.html',
  styleUrls: ['./preview-image.page.scss'],
})
export class PreviewImagePage implements OnInit {
  img: string;
  serverUrl = environment.url;
  @ViewChild('slider', {read: ElementRef })slider: ElementRef;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  ngOnInit() {
    this.img = this.serverUrl + '/' + this.navParams.get('image');
  }

  zoom(zoomIn: boolean) {
    const zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
