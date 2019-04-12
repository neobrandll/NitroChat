import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {User} from '../../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {RegisterResponse} from '../../models/registerResponse.model';
import {SimpleAlertService} from '../../services/simple-alert.service';


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
              private alert: SimpleAlertService
              ) { }



  ngOnInit(): void{
      this.serverUrl = environment.url;
    this.isLoading = true;
    this.loadingCtrl
        .create({ keyboardClose: true, message: 'Logging in...' })
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
                    validators: [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)]
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
      this.auth.token.pipe(take(1)).subscribe(token => {
          const httpOptions = {
              headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              })
          };
          this.http.put<RegisterResponse>(`${this.serverUrl}/updateProfile`, JSON.stringify(body), httpOptions)
              .subscribe(updateResp => {
                  const updatedUser = new User(
                      updateResp.user.token
                      , updateResp.user._id
                      , updateResp.user.email
                      , updateResp.user.name
                      , updateResp.user.username
                      , updateResp.user.followers
                      , updateResp.user.following
                      , updateResp.user.profileImage);
                  this.auth.updateUser(updatedUser);
                  this.alert.showAlert('Success!', 'Update Complete!');
              });
      });
    }

}
