import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarDetailsPage } from './car-details';
import { DebounceInputDirectiveModule } from '../../directives/debounce-input/debounce-input.module';

@NgModule({
  declarations: [
    CarDetailsPage,
  ],
  imports: [
    DebounceInputDirectiveModule,
    IonicPageModule.forChild(CarDetailsPage),
  ],
})
export class CarDetailsPageModule {}
