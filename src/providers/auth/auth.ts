import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/app.config';
import { Facebook } from '@ionic-native/facebook';

import { Sign } from '../../models/sign.interface';
import { UserInfo } from '../../models/userinfo.interface';


@Injectable()
export class AuthProvider {

  private apiURL:any;
  public isLoged:boolean = false;

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public appConfig:AppConfig,
    public fb: Facebook) {
    this.apiURL = appConfig.apiBaseUrl + "auth/";
  }

  private setToken(token: string){
    this.storage.set('token', token);
    window.localStorage.setItem('token',token);
  }

  private setUserInfo(userInfo: any){
    this.storage.set('userInfo', userInfo);
    window.localStorage.setItem('userInfo',JSON.stringify(userInfo));
  }

  public checkAuthentication(){
    return new Promise((resolve,reject) => {
      this.http.get(this.apiURL + 'protected')
      .subscribe(res => {
        let user = JSON.parse(this.getUserInfo()) as UserInfo;
        this.isLoged = true;
        resolve(user);
      }, (err) => {
        this.isLoged = false;
        reject(err);
      });
    });
  }

  public getToken():string{
    return window.localStorage.getItem('token');
  }

  public getUserInfo(): string{
    return window.localStorage.getItem('userInfo');
  }

  public createAccount(details):any{
    return new Promise((resolve,reject) => {
      this.http.post(this.apiURL + 'register', details)
      .subscribe(res => {
        const data = res as Sign;
        this.setToken(data.token);
        this.setUserInfo(data.user);
        resolve(data.user);
      }, (err) =>{
        reject(err);
      });
    });
  }

  public login(details): any{
    return new Promise((resolve, reject) => {
      this.http.post(this.apiURL + 'login', details)
      .subscribe(res => {
        const data = res as Sign;
        this.setToken(data.token);
        this.setUserInfo(data.user);
        resolve(data.user);
      }, (err) => {
        reject(err);
      })
    })
  }

  public fbLogin(): any{
    return new Promise((resolve,reject) => {
      let permissions = new Array<string>();
      permissions = ["public_profile","email"];
      let env = this;

      this.fb.login(permissions)
        .then(function(response){
          let userId = response.authResponse.userID;
          let params = new Array<string>();

          env.fb.api("/me?fields=first_name,last_name,email", params)
            .then(function(user){
              user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
              let credentials = {
                email: user.email,
                userId: userId,
                picture: user.picture,
                password: userId,
                name: {
                  firstName:user.first_name,
                  lastName:user.last_name
                }
              };

              env.http.post(env.apiURL + 'facebook', credentials)
                .subscribe(res => {
                  const data = res as Sign;
                  env.setToken(data.token);
                  env.setUserInfo(data.user);
                  resolve(data.user);
                }, (err) =>{
                  reject(err);
                });
            }, function(error){
              reject(error);
            });
        }, function(error){
          reject(error);
        })
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
