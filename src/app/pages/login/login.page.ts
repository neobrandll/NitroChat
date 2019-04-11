import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

 constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      })
    });
  }
  onLogin() {
    if (!this.form.valid) {
      return;
    }
    const username = this.form.value.username;
    const password = this.form.value.password;
    this.loadingCtrl
        .create({ keyboardClose: true, message: 'Logging in...' })
        .then(loadingEl => {
          loadingEl.present();
          this.authService.login(username, password).subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/home']);
          }, () => {
            loadingEl.dismiss();
          });
        });

  }

  onSwitchAuthMode() {
    this.router.navigate(['register']);
  }

}
