export class CarDetails{
  transmission:string
  kilometer:string
  gas:string
  other:string
  model:string
  version:string
  make:string
  pictures:Array<string>

  constructor(car){
    this.make = car.make;
    this.version = car.version;
    this.model = car.model;
    this.pictures = car.pictures;
  }
}
