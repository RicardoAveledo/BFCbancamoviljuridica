import { FormControl } from '@angular/forms';
export class UsernameValidator {
  static validUsername(fc: FormControl){
    if(fc.value.toLowerCase() === "jlaroche" || fc.value.toLowerCase() === "jlaroche"){
      return ({validUsername: true});
    } else {
      return (null);
    }
  }
}