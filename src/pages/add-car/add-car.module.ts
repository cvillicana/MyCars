import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCarPage } from './add-car';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    AddCarPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(AddCarPage),
  ],
})
export class AddCarPageModule {}
