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
              private alertCtrl: AlertController,
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
      const newName = this.form.value.name;
      const newUsername = this.form.value.username;
      const newEmail = this.form.value.email;
      this.auth.token.pipe(take(1)).subscribe(token => {
          const httpOptions = {
              headers: new HttpHeaders({
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': `Bearer ${token}`
              })
          };
          const body = new HttpParams()
              .set('name', newName)
              .set('username', newUsername)
              .set('email', newEmail);
          this.http.put<RegisterResponse>(`${this.serverUrl}/updateProfile`, JSON. body, httpOptions)
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
                  this.postService.fetchPosts().pipe(take(1)).subscribe();
                  this.showAlert('Success!', 'Update Complete!');
              });
      });
    }

    private showAlert( header: string , message: string) {
        this.alertCtrl
            .create({
                header: header,
                message: message,
                buttons: [
                    {
                        text: 'Okay',
                        handler: () => {
                                this.router.navigate(['/home']);
                            }
                        }
                ]
            })
            .then(alertEl => alertEl.present());
    }
}
