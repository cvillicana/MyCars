import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth/auth';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authService:AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      authService.checkAuthentication().then((res) => {
        statusBar.styleDefault();
        splashScreen.hide();
      }, (err) => {
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });
  }
}
