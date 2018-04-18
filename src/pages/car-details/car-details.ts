import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard, ActionSheetController } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CarDetails } from '../../models/car.details';
import { ImageViewerController } from 'ionic-img-viewer';
import { CarProvider } from '../../providers/car/car';
import { BranchIoProvider } from '../../providers/branch-io/branch-io';

import { DebounceInputDirectiveModule } from '../../directives/debounce-input/debounce-input.module';

@IonicPage()
@Component({
  selector: 'page-car-details',
  templateUrl: 'car-details.html',
  animations: [
   trigger(
     'myAnimation',
     [
       transition(':enter',
         [style({ transform: 'translateX(100%)', opacity: 0 }),
         animate('500ms', style({ transform: 'translateX(0)', 'opacity': 1 }))]),
       transition(':leave',
         [
         animate('500ms', style({ transform: 'translateY(-100%)', 'opacity': 0 }))])
     ])]
})

export class CarDetailsPage {
  public _imageViewerCtrl: ImageViewerController;

  public carDetails: CarDetails;
  public carFromView: any;

  constructor(
    public branchIOService: BranchIoProvider,
    public carService: CarProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public imageViewerCtrl: ImageViewerController,
    public actionSheetCtrl: ActionSheetController,
    public keyboard: Keyboard) {
    this.carFromView = navParams.get('car');
    this.carDetails = new CarDetails(this.carFromView);
    console.log(this.carDetails);
    this._imageViewerCtrl = imageViewerCtrl;


  }

  public isKeyboardOpen():boolean {
    return this.keyboard.isOpen();
  }

  public presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  public onChangeTime(value, prop){
    if(!value || !prop) return;

    let data = {};

    data[prop] = value;

    this.carService.updateCar(this.carDetails.id, data)
      .then((res)=> {
      }, (err) => {
    });

  }

  public createDeepLink(){
    var linkProperties = {
      shareId: this.carDetails.shareId,
      carDescription: this.carDetails.model + " " + this.carDetails.make + " " + this.carDetails.version,
      imageUrl: this.carDetails.pictures[0],
      view: "CarSharedPage",
      price: this.carDetails.price
    }

    this.branchIOService.createDeepLink(linkProperties).then((res) => {

    }, (err) => {

    });
  }

  public pictureOptions(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      buttons: [
        {
          text: 'Add more pictures',
          handler: () => {
            this.goToPictures();
          }
        },
        {
          text: 'Share',
          handler: () => {
            this.createDeepLink();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }]
    });
    actionSheet.present();
  }


  public goToPictures(){
    this.navCtrl.push('PicturesPage',
    {
      "carDetails": this.carDetails
    });
  }

}
