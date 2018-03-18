import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthProvider } from '../providers/auth/auth';

@Injectable()
export class EmailValidator{

  debouncer: any;

  constructor(public authService: AuthProvider){}

  checkEmail(control: FormControl): any{
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.authService.valideEmail(control.value)
          .then((result) =>{
            if(result){
              resolve(null);
            }
          }, (err) => {
            resolve({'emailInUser':true});
          })
      }, 1000);
    });

  }
}
