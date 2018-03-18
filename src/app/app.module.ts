import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppConfig }    from '../config/app.config';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Facebook } from '@ionic-native/facebook';


import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { CarInfoProvider } from '../providers/car-info/car-info';
import { ImageProvider } from '../providers/image/image';
import { AuthProvider } from '../providers/auth/auth';
import { EmailValidator } from '../validators/email';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorsAuthProvider } from '../providers/interceptors-auth/interceptors-auth';
import { CarProvider } from '../providers/car/car';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass:InterceptorsAuthProvider, multi:true},
    CarInfoProvider,
    ImageProvider,
    Camera,
    File,
    FileTransfer,
    FilePath,
    Crop,
    ImagePicker,
    AuthProvider,
    Facebook,
    AppConfig,
    IonicStorageModule,
    EmailValidator,
    CarProvider
  ]
})
export class AppModule {}
