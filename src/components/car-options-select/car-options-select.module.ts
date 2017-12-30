import { NgModule } from '@angular/core';
import { CarOptionsSelectComponent } from './car-options-select';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [CarOptionsSelectComponent],
  imports: [ IonicModule ],
  exports: [ CarOptionsSelectComponent]
})
export class CarOptionsSelectModule {}
