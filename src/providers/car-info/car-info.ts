import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/app.config';
import { CarMake } from '../../models/car.makes.interface';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CarInfoProvider {

  public getCarInfoUrl : any;
  public jsonData: any;
  public carMakes : any;


  constructor(public http: HttpClient, public appConfig: AppConfig) {
    this.getCarInfoUrl = appConfig.autoPlaza;
  }

// TODO:
// add environment variables


  getCarMakes(){
    return new Promise((resolve, reject) => {
      this.http.get('assets/data/makes.json')
      .subscribe(response => {
        resolve(response);
      }, (err) => {
        reject(err)
      });
    });
  }

  getCarModels(makeId){
    return new Promise((resolve, reject) => {
      this.http.get(this.getCarInfoUrl + makeId + "/models")
      .subscribe(response => {
        resolve(response);
      }, (err) => {
        reject(err)
      });
    });
  }

  getCarVersion(model, make, year){
    return new Promise((resolve, reject) => {
      this.http.get("https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&make="+make+"&year="+year+"&model="+model+"&sold_in_us=1",
      {responseType: 'text'})
      .subscribe(response => {
        this.jsonData = response.replace(/\?|\(|\)|\;/g, "");
        resolve(JSON.parse(this.jsonData).Trims.map(x => x.model_trim));
      }, (err) => {
        reject(err)
      });
    });
  }

}
