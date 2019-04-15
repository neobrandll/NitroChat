import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {SimpleAlertService} from '../../services/simple-alert.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {RegisterService} from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  pwdMatch = false;
  url = environment.url;
  constructor(
      private router: Router
      , private http: HttpClient
      , private alert: SimpleAlertService,
      private loadingCtrl: LoadingController,
      private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      number: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required
          , Validators.pattern(/^[0-9]{10}$/)]
      }),
      username: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(3)]
      }),
      passwordConfirm: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(3)]
      })
    }, this.passwordMatchValidator);
  }



  passwordMatchValidator = (g: FormGroup) => {
    if (g.get('password').value === g.get('passwordConfirm').value) {
      this.pwdMatch = true;
      return null;
    } else {
      this.pwdMatch = false;
      return {'mismatch': true};
    }
  };


  onSwitchToLogin() {
    this.router.navigate(['/', 'login']);
  }

  onRegister() {
    if (!this.form.valid) {
      return;
    }
    const phone = this.form.value.number;
    const email = this.form.value.email;
    const password = this.form.value.password;
    const username = this.form.value.username;
    const name = this.form.value.name;

    this.loadingCtrl
        .create({ keyboardClose: true, message: 'Logging in...' })
        .then(loadingEl => {
          loadingEl.present();
          this.registerService.onRegister(phone, email, username, password, name)
              .subscribe(() => {
                loadingEl.dismiss();
                this.alert.showAlert('Register', `Register complete!` );
                this.router.navigate(['/login']);
              }, error => {
                loadingEl.dismiss();
                this.alert.showAlert('Error',  'An error has occurred while registering');
              });
        });
  }


}
