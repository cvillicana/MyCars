import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth/auth';
import { BranchIoProvider } from '../providers/branch-io/branch-io';

declare var Branch;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authService:AuthProvider, branchIOService: BranchIoProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      handleBranch();
      authService.checkAuthentication().then((res) => {
      }, (err) => {
      });
    });

    platform.resume.subscribe(() => {
      handleBranch();
    });

    // Branch initialization
    const handleBranch = () => {
      // only on devices
      if (!platform.is('cordova')) { return }
      const Branch = window['Branch'];
      Branch.initSession(data => {
        if (data['+clicked_branch_link']) {
          branchIOService.handleLinkData(data);
        }
      });
    }

  }

}
