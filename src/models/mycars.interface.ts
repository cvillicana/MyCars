export interface MyCars{
  success:boolean,
  cars:Array<{
    make:string,
    model:string,
    version: boolean,
    price: string,
    pictures:Array<string>
  }>
}