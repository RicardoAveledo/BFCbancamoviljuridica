import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';

@Component({
  selector: 'page-posici-nconsolidada',
  templateUrl: 'posici-nconsolidada.html'
})
export class PosiciNConsolidadaPage {

  constructor(public navCtrl: NavController) {
  }
  goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeLaCuentaPage);
  }goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeTarjetaPage);
  }
}
