import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController, Platform, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

declare var cordova: any;

@Injectable()
export class ImageProvider {

  public lastImage : any;

  constructor(public actionSheetCtrl: ActionSheetController,
    public camera: Camera, public platform:Platform, public filePath:FilePath,
    public file:File, public toastCtrl:ToastController) {}

  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName){
    return new Promise((resolve, reject) =>{
      this.file.copyFile(
        namePath,
        currentName,
        cordova.file.dataDirectory,
        newFileName
      ).then((success) => {
        resolve(newFileName);
      }, (err) => {
        this.presentToast('Error while storing file.');
        reject(err);
      });
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  takePicture(sourceType){
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    return new Promise((resolve, reject) => {
      this.camera.getPicture(options).then((imagePath) => {
        if(this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY){
          this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(
              correctPath,
              currentName,
              this.createFileName()
            ).then((success)=>{
              resolve(success);
            }, (err) => {
              reject(err);
            });
          })
        }else{
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          ).then((success) => {
            resolve(success);
          }, (err) => {
            reject(err);
          });
        }
      }, (err) => {
        console.log("Error while selecting image");
      });
    });
  }

  public presentActionSheet():any{
    return new Promise((resolve, reject) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: "Select Image Source",
        buttons: [
          {
            text: "Load from Library",
            handler: () => {
              this.takePicture(
                this.camera.PictureSourceType.PHOTOLIBRARY
              ).then((success) => {
                var image = this.pathForImage(success);
                resolve(image);
              }, (err) => {
                reject(err);
              });
            }
          },
          {
            text: "Use Camera",
            handler: () => {
              this.takePicture(
                this.camera.PictureSourceType.CAMERA
              ).then((success) => {
                var image = this.pathForImage(success);
                resolve(image);
              }, (err) => {
                reject(err);
              });
            }
          },
          {
            text: "Cancel",
            role: "cancel"
          }
        ]
      });
      actionSheet.present();
    });

  }

}
