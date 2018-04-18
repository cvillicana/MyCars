export interface MyCars{
  success:boolean,
  cars:Array<{
    make:string,
    model:string,
    version: boolean,
    price: string,
    shareId: string,
    pictures:Array<string>,
    kilometer: string,
    transmission: string,
    other: string,
    gas: string,
    _user: {
      picture: string
    }
  }>
}
