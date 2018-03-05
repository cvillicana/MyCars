import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageProvider } from '../../providers/image/image';
import { AuthProvider } from '../../providers/auth/auth';
import { CarInfoProvider } from '../../providers/car-info/car-info';
import { CarProvider } from '../../providers/car/car';
import { EmailValidator } from '../../validators/email';


@IonicPage()
@Component({
  selector: 'page-add-car',
  templateUrl: 'add-car.html',
})
export class AddCarPage {

  @ViewChild('addCarSlide') addCarSlider: any;

  public signUpForm:any;
  public loading: any;
  public submitAttempt: boolean;

  public carSpecForm:any;
  public imagesPath: Array<string> = [];

  public carYears: Array<number> = [];
  public year: number;

  public carMakes: any;
  public make: any;

  public carModels: any;
  public model: string;

  public alreadyLoged: boolean;

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
        email: ['', Validators.compose([Validators.maxLength(30), <any>Validators.email, Validators.required]), emailValidator.checkEmail.bind(emailValidator)],
        password: ['']
      });
    for(var year = 2018; year > 1999; year--) this.carYears.push(year);

  }

  ionViewDidLoad(){
    this.addCarSlider.lockSwipes(true);
    this.addCarSlider.paginationHide =

    this.authService.checkAuthentication().then((res) => {
      this.alreadyLoged = true;
      }, (err) => {
      this.alreadyLoged = false;
    });

  }

  public canAddImages(): boolean{
    if(!this.make) return false;
    if(!this.model) return false;
    if(!this.year) return false;
    this.addCarSlider.lockSwipes(false);
    return true;
  }

  public canUploadCar(): boolean{
    var emptyImage = true;
    for(var i = 0; i < 4; i ++){
      emptyImage = !this.imagesPath[i];
    }
    return !emptyImage;
  }

  public next():void{
    this.addCarSlider.slideNext();
  }

  public prev():void{
    this.addCarSlider.slidePrev();
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

  public getCarModelsByMake(make:any):void{
    if(!make){
      this.carModels = make;
      this.year = undefined;
      return;
    }
    this.carInfoService.getCarModels(make.id).then((res) => {
      this.carModels = res[2];
    });
  }

  public registerUser(model, isValid: boolean){
    if(!isValid){
      return;
    }

    this.submitAttempt = true;

    this.showLoader();

    this.authService.createAccount(model).then((result) => {
      this.loading.dismiss();
      this.alreadyLoged = true;
    }, (err) => {
      this.loading.dismiss();
    });

  }

  public saveCar(){
    var data = {
      make: this.make.name,
      model: this.model,
      year: this.year
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
      content: 'Authenticating...'
    });
    this.loading.present();
  }

  public goToMyCars(){
    this.navCtrl.setPages([{page:'NewsPage'}, {page:'MyCarsPage'}]);
  }



}
