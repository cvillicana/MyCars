import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

import { UserInfo } from '../../models/userinfo.interface';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public loading: any;
  public hasUserAccount: boolean;

  public alreadyLoged: boolean;
  public userInfo: UserInfo;
  public signUpForm:any;
  public loginForm:any;
  public submitAttempt: boolean;

  constructor(
    public authService: AuthProvider,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public emailValidator: EmailValidator,
    public navParams: NavParams) {
      this.signUpForm = formBuilder.group({
        firstName:[''],
        lastName:[''],
        email: ['', Validators.compose([Validators.maxLength(30), <any>Validators.email, Validators.required]), emailValidator.checkEmail.bind(emailValidator)],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), <any>Validators.email, Validators.required])],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
      this.hasUserAccount = true;
  }

  ionViewDidLoad() {
    this.showLoader();
    this.authService.checkAuthentication().then((res) => {
      this.loading.dismiss();
      this.alreadyLoged = true;
      this.userInfo = res as UserInfo;
      }, (err) => {
        this.loading.dismiss();
      this.alreadyLoged = false;
    });
  }

  private registerUser(model, isValid: boolean){
    if(!isValid){
      return;
    }

    this.submitAttempt = true;

    this.showLoader();

    this.authService.createAccount(model).then((result) => {
      this.loading.dismiss();
      this.alreadyLoged = true;
      this.userInfo = result as UserInfo;
      }, (err) => {
        this.loading.dismiss();
    });

  }

  private loginUser(model, isValid: boolean){
    if(!isValid){
      return;
    }

    this.submitAttempt = true;

    this.showLoader();

    this.authService.login(model).then((result) => {
      this.loading.dismiss();
      this.alreadyLoged = true;
      this.userInfo = result as UserInfo;
    }, (err) => {
      this.loading.dismiss();
    });

  }

  private facebookLogin(){
    this.showLoader();

    this.authService.fbLogin().then((result) =>{
      this.loading.dismiss();
      this.alreadyLoged = true;
      this.userInfo = result as UserInfo;
    }, (err) => {
      this.loading.dismiss();
    });
  }

  public showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Saving car...'
    });
    this.loading.present();
  }


}
