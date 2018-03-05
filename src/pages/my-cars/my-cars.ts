import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrencyPipe } from '@angular/common';

/**
 * Generated class for the MyCarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-cars',
  templateUrl: 'my-cars.html',
})
export class MyCarsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public testCurrency: number = 155599;

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCarsPage');
  }

  public goToCarDetails(){
    this.navCtrl.push('CarDetailsPage');
  }

}
