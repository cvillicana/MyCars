import { Injectable } from '@angular/core';
import { NavController, App } from 'ionic-angular';

@Injectable()
export class BranchIoProvider {

  constructor(protected app:App) {
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
