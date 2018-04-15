import { Injectable } from '@angular/core';
import { NavController, App } from 'ionic-angular';

declare var Branch;

@Injectable()
export class BranchIoProvider {

  constructor(protected app:App) {
  }

  private createContentReference(){

    return new Promise((resolve, reject) => {

      var properties = {
        canonicalIdentifier: 'content/123',
        title: 'Content 123 Title',
        contentDescription: 'Content 123 Description ' + Date.now(),
        contentImageUrl: 'http://lorempixel.com/400/400/',
        contentIndexingMode: 'private',
      }

      var branchUniversalObj = null;
      Branch.createBranchUniversalObject(properties).then(function (res) {
        branchUniversalObj = res
        resolve(branchUniversalObj);
      }).catch(function (err) {
        reject(err);
      });

    });

  }

  public createDeepLink(){
    return new Promise((resolve, reject) => {

      if(Branch)  reject();

      this.createContentReference().then((res) => {

        var branchUniversalObj = res as any;

        // optional fields
        var analytics = {
          channel: 'facebook',
          alias: ""
        }

        // optional fields
        var properties = {
          $match_duration: 2000,
          shareId: "",
          view: ""
        }

        branchUniversalObj.generateShortUrl(analytics, properties).then(function(res){
          resolve(res);
        }, (err) => {
          reject(err);
        });

      }, (err) => {
        reject(err)
      });

    });


  }


  public handleLinkData(linkData:any){
    if(!linkData){
      return;
    }

    if(linkData.view == "CarSharedPage" && linkData.shareId){
      this.goToView(linkData)
    }

  }

  public goToView(data){
    if(!data){
      return;
    }

    this.navCtrl.push(data.view, { shareId: data.shareId });

  }

  get navCtrl(): NavController {
    return this.app.getRootNav();
  }


}
