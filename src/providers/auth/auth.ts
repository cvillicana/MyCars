import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/app.config';

import { Sign } from '../../models/sign.interface';


@Injectable()
export class AuthProvider {

  private apiURL:any;
  public isLoged:boolean = false;

  constructor(public http: HttpClient,public storage: Storage, public appConfig:AppConfig) {
    this.apiURL = appConfig.apiBaseUrl + "auth/";
  }

  public checkAuthentication(){
    return new Promise((resolve,reject) => {
      this.http.get(this.apiURL + 'protected')
      .subscribe(res => {
        this.isLoged = true;
        resolve(res);
      }, (err) => {
        this.isLoged = false;
        reject(err);
      });
    });
  }

  public getToken():string{
    return window.localStorage.getItem('token');
  }


  public createAccount(details):any{
    return new Promise((resolve,reject) => {
      this.http.post(this.apiURL + 'register', details)
      .subscribe(res => {
        const data = res as Sign;
        this.storage.set('token', data.token);
        window.localStorage.setItem('token',data.token);
        resolve(res);
      }, (err) =>{
        reject(err);
      });
    });
  }

  public valideEmail(email):any{
    return new Promise((resolve,reject) =>  {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.apiURL + 'exists/'+ email, {headers:headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  public logout(): any{
    this.storage.set('token', '');
  }

}
