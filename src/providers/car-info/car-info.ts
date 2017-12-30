import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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


  constructor(public http: HttpClient) {
    this.getCarInfoUrl = "http://www.carqueryapi.com/api/0.3/?callback=?&cmd="
  }

// TODO:
// add environment variables


  getCarMakes(year){
    return new Promise((resolve, reject) => {
      this.http.get("http://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year="+year+"&sold_in_us=1",
      {responseType: 'text'})
      .subscribe(response => {
        this.jsonData = response.replace(/\?|\(|\)|\;/g, "");
        this.carMakes = JSON.parse(this.jsonData);
        resolve(this.carMakes.Makes.map(x => x.make_display));
      }, (err) => {
        reject(err)
      });
    });
  }

  getCarModels(make, year){
    return new Promise((resolve, reject) => {
      this.http.get("https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make="+make+"&year="+year+"&sold_in_us=1",
      {responseType: 'text'})
      .subscribe(response => {
        this.jsonData = response.replace(/\?|\(|\)|\;/g, "");
        resolve(JSON.parse(this.jsonData).Models.map(x => x.model_name));
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
