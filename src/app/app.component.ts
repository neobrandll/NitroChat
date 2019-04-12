import {Component, ElementRef} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins, Capacitor, AppState } from '@capacitor/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private darkMode = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  switchMode() {
    if (this.darkMode) {
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('--ion-background-color', '#f4f5f8');
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('--ion-background-color-rgb', '244, 244, 244');
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('--ion-text-color', '#39393a');
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('--ion-text-color-rgb', '57, 57, 58');
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('--app-icons-color', '#4b5059');
      this.darkMode = !this.darkMode;
    } else {
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('--ion-background-color', '#4b5059');
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('--ion-background-color-rgb', '75, 80, 89');
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('--ion-text-color', '#ffffff');
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('--ion-text-color-rgb', '255, 255, 255');
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('--app-icons-color', '#ffffff');
      this.darkMode = !this.darkMode;
    }

  }

  goToProfile() {
    this.authService.user.pipe(take(1)).subscribe( user => {
      this.router.navigate(['/userProfile', user.id]);
    });
  }
}
