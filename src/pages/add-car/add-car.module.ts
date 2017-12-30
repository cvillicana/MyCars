import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCarPage } from './add-car';
import { CarOptionsSelectModule } from '../../components/car-options-select/car-options-select.module';

@NgModule({
  declarations: [
    AddCarPage,
  ],
  imports: [
    CarOptionsSelectModule,
    IonicPageModule.forChild(AddCarPage),
  ],
})
export class AddCarPageModule {}
