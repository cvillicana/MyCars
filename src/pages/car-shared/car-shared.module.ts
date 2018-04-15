import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarSharedPage } from './car-shared';

@NgModule({
  declarations: [
    CarSharedPage,
  ],
  imports: [
    IonicPageModule.forChild(CarSharedPage),
  ],
})
export class CarSharedPageModule {}
