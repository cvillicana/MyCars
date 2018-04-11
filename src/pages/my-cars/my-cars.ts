import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CurrencyPipe } from '@angular/common';
import { CarProvider } from '../../providers/car/car';

import { MyCars } from '../../models/mycars.interface';

@IonicPage()
@Component({
  selector: 'page-my-cars',
  templateUrl: 'my-cars.html',
})
export class MyCarsPage {

  public loading: any;
  public myCars: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public carService: CarProvider) {
  }

  public testCurrency: number = 155599;

  ionViewWillEnter() {
    console.log('ionViewDidLoad MyCarsPage');
    this.getMyCars();
  }

  public goToCarDetails(car){
    this.navCtrl.push('CarDetailsPage', {car: car});
  }

  public getMyCars(){
    this.showLoader();
    this.carService.getMyCars().then((data) => {
      var result = data as MyCars;
      if(result.success){
        this.myCars = result.cars;
      }
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    })

  }

  public doRefresh(refresher) {
    this.carService.getMyCars().then((data) => {
      var result = data as MyCars;
      if(result.success){
        this.myCars = result.cars;
      }
      refresher.complete();
    }, (err) => {
      refresher.complete();
    })
  }

  public goToAddCar(){
    this.navCtrl.push('AddCarPage');
  }

  public goToProfile(){
    this.navCtrl.push('ProfilePage');
  }

  public showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'getting cars...'
    });
    this.loading.present();
  }

}
