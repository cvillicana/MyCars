import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'car-options',
  templateUrl: 'car-options-select.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({opacity: 0}), {optional:true}),

        query(':enter', stagger('100ms',[
          animate('100ms ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
          ]))
        ]), {optional:true})
      ])
    ])
  ]
})

export class CarOptionsSelectComponent {

  @Input() public options: number[];
  @Input() public optionText : any;
  @Output() public itemSelected: EventEmitter<any>;


  public optionSelected: any;
  public displayList: boolean = false;


  constructor() {
    this.itemSelected = new EventEmitter<any>();
  }

  public setOption(option){
    this.optionSelected = option;
    this.itemSelected.emit(option);
    this.displayList = false;
  }

  public unsetOption(){
    if(this.optionSelected){
      this.optionSelected = undefined;
      this.itemSelected.emit(this.optionSelected);
    }
  }

}
