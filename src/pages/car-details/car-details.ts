import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarDetails } from '../../models/car.details';


/**
 * Generated class for the CarDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-details',
  templateUrl: 'car-details.html',
})
export class CarDetailsPage {

  public carDetails: CarDetails;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carDetails = new CarDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarDetailsPage');
  }

}
