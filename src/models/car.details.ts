export class CarDetails{
  id:string
  shareId: string
  transmission:string
  kilometer:string
  gas:string
  other:string
  model:string
  version:string
  make:string
  price:string
  color:string
  pictures:Array<string>

  constructor(car){
    this.id = car._id;
    this.shareId = car.shareId;
    this.make = car.make;
    this.version = car.version;
    this.model = car.model;
    this.pictures = car.pictures;
    this.kilometer = car.kilometer;
    this.transmission = car.transmission;
    this.gas = car.gas;
    this.price = car.price;
    this.color = car.color;
    this.other = car.other;
  }
}
