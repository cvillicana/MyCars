import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageProvider } from '../../providers/image/image';
import { AuthProvider } from '../../providers/auth/auth';
import { CarInfoProvider } from '../../providers/car-info/car-info';
import { CarProvider } from '../../providers/car/car';
import { EmailValidator } from '../../validators/email';

import { UserInfo } from '../../models/userinfo.interface';


@IonicPage()
@Component({
  selector: 'page-add-car',
  templateUrl: 'add-car.html'
})

export class AddCarPage {

  @ViewChild('addCarSlide') addCarSlider: any;

  public signUpForm:any;
  public loginForm:any;
  public userInfo: UserInfo;

  public loading: any;
  public submitAttempt: boolean;

  public carSpecForm:any;
  public imagesPath: Array<string> = [];

  public carYears: Array<number> = [];
  public year: number;

  public carMakes: any;
  public carMake: any;
  public carModel: string;
  public carVersion: string;
  public carPrice: string;
  public contactPhone: string;

  public alreadyLoged: boolean;
  public hasUserAccount: boolean;

  public currentView: string;
  public pageHeader: string;
  public subHeader: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public imageService: ImageProvider,
    public carInfoService: CarInfoProvider,
    public authService: AuthProvider,
    public loadingCtrl: LoadingController,
    public emailValidator: EmailValidator,
    public carService: CarProvider
  ){
    this.getCarMakes();

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

    for(var year = 2018; year > 1999; year--) this.carYears.push(year);
    this.currentView = 'car-specifications';
    this.pageHeader = "DESCRIBE YOUR CAR";
    this.hasUserAccount = true;

  }

  ionViewDidLoad(){

    this.authService.checkAuthentication().then((res) => {
      this.alreadyLoged = true;
      this.userInfo = res as UserInfo;
      }, (err) => {
      this.alreadyLoged = false;
    });

  }

  public canAddImages(): boolean{
    if(!this.carMake) return false;
    if(!this.carModel) return false;
    if(!this.carVersion) return false;
    if(!this.carPrice) return false;
    return true;
  }

  public canUploadCar(): boolean{
    return true;
  }

  public getPictures(exactPosition,maximumImages):void{
    this.imageService.getPictures(this.imagesPath, exactPosition, maximumImages).then((res) => {
      console.log(this.imagesPath);
    });
  }

  public getCarMakes():void{
    this.carInfoService.getCarMakes().then((res) => {
      this.carMakes = res;
    });
  }

  public setView(view:string):void{
    if(!view){
      return;
    }
    switch(view){
      case 'car-specifications':
          this.pageHeader = "DESCRIBRE YOUR CAR";
          this.subHeader = "";
      break;
      case 'car-images':
          this.pageHeader = "ADD YOUR BEST PHOTOS";
          this.subHeader = "Add 4 photos then you can add a thousand more";
      break;
      case 'save-car':
          this.pageHeader = "WHO'S OWNER?";
          this.subHeader = "";
      break;
    }
    this.currentView = view;
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

  private saveCar(){
    var data = {
      make: this.carMake.name,
      model: this.carModel,
      version: this.carVersion,
      price: this.carPrice ?  this.carPrice.replace(/\$|\s/g, '') : '',
      ownerName: this.userInfo.name,
      contactPhone: this.contactPhone ? this.contactPhone.replace(/\(|\)|\s|\-/g, '') : ''

    }

    this.showLoader();

    this.carService.saveCar(data).then((result)=>{
      if(this.imagesPath.length > 0){
        this.carService.uploadImage(this.imagesPath, result).then((res)=> {
          this.loading.dismiss();
          this.goToMyCars();
        }, (err) => {
          this.loading.dismiss();
        })
      }else{
        this.goToMyCars();
        this.loading.dismiss();
      }
    }, (err) => {
      this.loading.dismiss();
    });
  }

  public makeCompare(a:{ id:string,name:string},b:{ id:string,name:string}){
    if(a.id === b.id) return true;
    return false;
  }

  public showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Saving car...'
    });
    this.loading.present();
  }

  public goToMyCars(){
    this.navCtrl.popToRoot();
  }

  public swipe(event, from){
    switch(from){
      case 'specifications':
        if(event.direction === 2 && this.canAddImages()) {
          this.setView("car-images");
        }
      break;
      case 'images':
        if(event.direction === 4) {
          this.setView("car-specifications");
        }
        if(event.direction === 2 && this.canUploadCar()) {
          this.setView("save-car");
        }
      break;
      case 'save':
        if(event.direction === 4) {
          this.setView("car-images");
        }
      break;
    }
  }



}
