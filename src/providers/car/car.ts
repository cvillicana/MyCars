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

  public getMyCars(){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiURL + "me")
      .subscribe(res => {
        var data = res
        resolve(data);
      }, (err) => {
        reject(err);
      })
    })
  }

  public getCarByShareId(id){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiURL + "share/" + id)
      .subscribe(res => {
        var data = res
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  public removePicture(id, pictures){
    return new Promise((resolve, reject) => {
      this.http.put(this.apiURL + id + "/images", {pictures: pictures})
      .subscribe(res => {
        var data = res;
        resolve(data);
      }, (err) => {
        reject(err);
      })
    })
  }

  public updateCar(id, data){
    return new Promise((resolve, reject) => {
      this.http.put(this.apiURL + id + "/", data)
      .subscribe(res => {
        var data = res;
        resolve(data);
      }, (err) => {
        reject(err);
      })
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


      for(var i=0; i<imagesPath.length; i++){
        const fileTransfer: FileTransferObject = this.transfer.create();

        fileTransfer.onProgress((e) => {
          let prg = (e.lengthComputable) ? Math.round(e.loaded / e.total * 100) : -1;
          console.log("progress: " + prg)
        });

        fileTransfer.upload(imagesPath[i], this.apiURL + "images", options).then((data) => {
          resolve(data);
        },(err) => {
          reject(err);
        });

      }

    });

  }

}
