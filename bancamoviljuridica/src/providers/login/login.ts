import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
    
  }

  getUser(){

    return this.http.get('http://localhost:2898/WsAfiliados.asmx?op=AfiliadosLogin'); 
  }
}
