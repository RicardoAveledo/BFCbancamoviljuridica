import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-detalle-de-la-cuenta',
  templateUrl: 'detalle-de-la-cuenta.html'
})
export class DetalleDeLaCuentaPage {

  constructor(public navCtrl: NavController) {
  }
  
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }
  
}
