import { Component, OnChanges, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarInfoProvider } from '../../providers/car-info/car-info';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import { CarMake } from '../../models/car.makes.interface';

@IonicPage()
@Component({
  selector: 'page-add-car',
  templateUrl: 'add-car.html',
})
export class AddCarPage {

  @ViewChild('addCarSlide') addCarSlider: any;

  public carYears: number[] = [1999];
  public year: number;

  public carMakes: any;
  public make: string;

  public carModels: any;
  public model: string;

  public carVersions: any;
  public version: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carInfoService: CarInfoProvider
  )
  {}

  ionViewDidLoad(){
    this.addCarSlider.lockSwipes(true);

    for(var year = 2000, i=0; year < 2019; year++, i++){
      this.carYears[i] = year;
    }


  }

  public getCarMakesByYear(year: number){
    if(!year){
      this.carMakes = year;
      this.carModels = year;
      this.carVersions = year;
      return;
    }
    this.year = year;
    this.carInfoService.getCarMakes(year).then((res) => {
      this.carMakes = res;
      this.carModels = undefined;
      this.carVersions = undefined;
    });
  }

  public getCarModelsByMake(make:string){
    if(!make){
      this.carModels = make;
      this.carVersions = make;
      return;
    }
    this.make = make;
    this.carInfoService.getCarModels(this.make, this.year).then((res) => {
      this.carModels = res;
      this.carVersions = undefined;
    });
  }

  public getCarVersionByModel(model:string){
    if(!model){
      this.carVersions = model;
      return;
    }
    this.model = model;
    this.carInfoService.getCarVersion(this.model, this.make, this.year).then((res) => {
      res[0] = res[0] === '' ? 'Regular' : res[0];
      this.carVersions = res;
    });
  }

  public readyToAddImages(): boolean{
    if(!this.year) return false;
    if(!this.make) return false;
    if(!this.model) return false;
    if(!this.version) return false;
    return true;
  }

}
