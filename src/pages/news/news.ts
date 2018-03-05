import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService:AuthProvider) {
      console.log(this.authService.isLoged)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
