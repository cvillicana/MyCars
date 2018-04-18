import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import { CurrencyPipe } from '@angular/common';

import { ImageViewerController } from 'ionic-img-viewer';

@IonicPage()
@Component({
  selector: 'page-car-shared',
  templateUrl: 'car-shared.html',
})
export class CarSharedPage {

  public shareId: string;
  public loading: any;
  public carShared: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public imageViewerCtrl : ImageViewerController,
    public carService: CarProvider) {
    this.shareId = navParams.get('shareId');
  }

  ionViewDidLoad() {
    this.getCarByShareId(this.shareId);
  }

  public getCarByShareId(id: string){
    if(!id) return;

    this.showLoader();

    this.carService.getCarByShareId(id).then((res:any) => {
      if(res.success){
        this.carShared = res.cars;
        console.log(res.cars)
      }
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    })

  }

  public presentImage(myImage) {
    const imageViewer = this.imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  public showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'getting car...'
    });
    this.loading.present();
  }


}
