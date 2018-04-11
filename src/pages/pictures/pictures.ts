import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { CarProvider } from '../../providers/car/car';

@IonicPage()
@Component({
  selector: 'page-pictures',
  templateUrl: 'pictures.html',
})
export class PicturesPage {

  public carPictures : Array<string>;
  public carId: string;
  public picturesCount: number = 0;

  public maximumImages: number = 20;

  public canRemovePictures: boolean = false;

  public loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public imageService: ImageProvider,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public carService: CarProvider) {
      let carDetails = navParams.get('carDetails');
      this.carPictures = carDetails.pictures;
      this.picturesCount = carDetails.pictures.length;
      this.carId = carDetails.id;
  }

  ionViewDidLoad() {
  }

  public getPictures():void{
    this.imageService.getPictures(this.carPictures, -1, this.maximumImages).then((res) => {
      this.uploadPictures();
    });
  }

  public uploadPictures():void{
    if(this.carPictures.length === 0) return;

    this.showLoader();

    this.carService.uploadImage(this.carPictures, this.carId)
      .then((res)=> {
      this.loading.dismiss();
      }, (err) => {
      this.loading.dismiss();
    });
  }

  public removePicture(index):void{
    if(this.carPictures.length <= 4) return;

    this.carPictures.splice(index,1);

    this.showLoader();

    this.carService.removePicture(this.carId, this.carPictures)
      .then((res)=> {
      this.loading.dismiss();
      }, (err) => {
      this.loading.dismiss();
    });
  }

  public pictureOptions(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      buttons: [
        {
          text: 'Add',
          handler: () => {
            this.getPictures();
          }
        },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            this.canRemovePictures = !this.canRemovePictures;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }]
    });
    actionSheet.present();
  }

  public showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Saving car...'
    });
    this.loading.present();
  }

}
