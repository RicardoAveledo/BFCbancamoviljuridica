import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-detalle-de-tarjeta',
  templateUrl: 'detalle-de-tarjeta.html'
})
export class DetalleDeTarjetaPage {

  constructor(public navCtrl: NavController) {
  }
  
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }
}
