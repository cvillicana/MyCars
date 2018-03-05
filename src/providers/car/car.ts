import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/app.config';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { BasicResponse } from '../../models/basicResponse.interface';
import { AuthProvider } from '../../providers/auth/auth';

@Injectable()
export class CarProvider {

  private apiURL:string;

  constructor(
    public http: HttpClient,
    private appConfig:AppConfig,
    private transfer: FileTransfer,
    private authService:AuthProvider) {
      this.apiURL = appConfig.apiBaseUrl + "cars/";
  }

  public saveCar(car){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiURL , car)
      .subscribe(res => {
        var data = res as BasicResponse;
        resolve(data.id);
      }, (err) =>{
        reject(err);
      });
    })
  }

  public uploadImage(imagesPath, carId){
    let t = this;
    return new Promise((resolve, reject) => {
      let token = t.authService.getToken();
      var options = {
        fileKey: "file",
        fileName: "filename",
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'id': carId},
        headers: {'Authorization': token }
      };

      const fileTransfer: FileTransferObject = this.transfer.create();

      for(var i=0; i<imagesPath.length; i++){
        fileTransfer.upload(imagesPath[i], this.apiURL + "images", options).then((data) => {
          resolve(data);
        },(err) => {
          reject(err);
        });

      }

    });

  }

}
