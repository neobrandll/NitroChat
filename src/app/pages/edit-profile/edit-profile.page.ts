import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {User, UserResponse} from '../../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {RegisterResponse} from '../../models/registerResponse.model';
import {SimpleAlertService} from '../../services/simple-alert.service';
import {EditProfileService} from '../../services/edit-profile.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
 user: User;
 form: FormGroup;
 isLoading: boolean;
 serverUrl: string;
  constructor(private auth: AuthService,
              private http: HttpClient,
              private router: Router,
              private loadingCtrl: LoadingController,
              private alert: SimpleAlertService,
              private editService: EditProfileService
              ) { }



  ngOnInit(): void {
      this.serverUrl = environment.url;
    this.isLoading = true;
    this.loadingCtrl
        .create({ keyboardClose: true, message: 'Loading...' })
        .then(loadingEl => {
          loadingEl.present();
          this.auth.user.pipe(take(1)).subscribe(user => {
            this.user = user;
            this.form = new FormGroup({
              username: new FormControl(this.user.username , {
                updateOn: 'change',
                validators: [Validators.required]
              }),
                number: new FormControl(this.user.phone, {
                    updateOn: 'change',
                    validators: [
                         Validators.required
                        , Validators.pattern(/^[0-9]{10}$/)]
                }),
              name: new FormControl(this.user.name, {
                updateOn: 'change',
                validators: [Validators.required]
              }),
              email: new FormControl(this.user.email, {
                updateOn: 'change',
                validators: [Validators.required, Validators.email]
              })
            });
            this.isLoading = false;
            loadingEl.dismiss();
          });
        });
  }

    onSubmit() {
        if (!this.form.valid) {
            return;
        }
        const body = {
         name : this.form.value.name,
         username : this.form.value.username,
         email : this.form.value.email,
         phone : this.form.value.number
        };
     this.editService.updateProfile(body).subscribe(() => {
         this.router.navigate(['/home'])
     });
    }

}
