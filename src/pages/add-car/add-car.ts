import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageProvider } from '../../providers/image/image';

@IonicPage()
@Component({
  selector: 'page-add-car',
  templateUrl: 'add-car.html',
})
export class AddCarPage {

  @ViewChild('addCarSlide') addCarSlider: any;

  public carSpecForm:any;
  public imagesPath: Array<string> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public imageService: ImageProvider
  )
  {
    this.carSpecForm = formBuilder.group({
        make:['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        model:['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        version:['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    })
  }

  ionViewDidLoad(){
    this.addCarSlider.lockSwipes(true);
  }

  public canAddImages():boolean{
    var validForm = this.carSpecForm.valid;
    this.addCarSlider.lockSwipes(!validForm);
    return validForm;
  }

  public next():void{
    this.addCarSlider.slideNext();
  }

  public prev():void{
    this.addCarSlider.slidePrev();
  }

  public takePicture(image){
    this.imageService.presentActionSheet().then((img) => {
      console.log(img);
      this.imagesPath.push(img);
    });
  }


}
