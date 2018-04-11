import { NgModule } from '@angular/core';
import { DebounceInputDirective } from './debounce-input';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [DebounceInputDirective],
  imports: [ IonicModule ],
  exports: [ DebounceInputDirective]
})
export class DebounceInputDirectiveModule {}
