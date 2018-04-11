export class CarDetails{
  id:string
  transmission:string
  kilometer:string
  gas:string
  other:string
  model:string
  version:string
  make:string
  pictures:Array<string>

  constructor(car){
    this.id = car._id;
    this.make = car.make;
    this.version = car.version;
    this.model = car.model;
    this.pictures = car.pictures;
    this.kilometer = car.kilometer;
    this.transmission = car.transmission;
    this.gas = car.gas;
    this.other = car.other;
  }
}
