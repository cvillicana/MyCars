import { Injectable } from '@angular/core';
import { NavController, App } from 'ionic-angular';

declare var Branch;

@Injectable()
export class BranchIoProvider {

  constructor(protected app:App) {
  }

  private createContentReference(data: any){

    return new Promise((resolve, reject) => {

      var properties = {
        canonicalIdentifier: data.shareId,
        title: data.carDescription,
        contentDescription: data.carDescription + " " + Date.now(),
        contentImageUrl: data.imageUrl,
        contentIndexingMode: 'private',
        contentMetadata: {
          view: data.view,
          shareId: data.shareId
        }
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

  public createDeepLink(linkProperties: any){
    return new Promise((resolve, reject) => {

      if(Branch)  reject();

      this.createContentReference(linkProperties).then((res) => {

        var branchUniversalObj = res as any;

        // optional fields
        var analytics = {
          alias: ""
        }

        // optional fields
        var properties = {
          $match_duration: 2000
        }

        var message = 'Check out this link'

        // optional listeners (must be called before showShareSheet)
        branchUniversalObj.onShareSheetLaunched(function (res) {
          // android only
          console.log(res)
        })
        branchUniversalObj.onShareSheetDismissed(function (res) {
          console.log(res)
        })
        branchUniversalObj.onLinkShareResponse(function (res) {
          console.log(res)
        })
        branchUniversalObj.onChannelSelected(function (res) {
          // android only
          console.log(res)
        })

        // share sheet
        branchUniversalObj.showShareSheet(analytics, properties, message);

      }, (err) => {
        reject(err)
      });

    });


  }


  public handleLinkData(linkData:any){
    if(!linkData){
      return;
    }

    if(linkData.view === "CarSharedPage" && linkData.shareId){
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
