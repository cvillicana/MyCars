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
  public carFromView: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carFromView = navParams.get('car');
    this.carDetails = new CarDetails(this.carFromView);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarDetailsPage');
  }

}
