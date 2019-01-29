import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { UserSessionProvider } from '../../providers/user-session/user-session';

@Component({
  selector: 'page-posici-nconsolidada',
  templateUrl: 'posici-nconsolidada.html'
})
export class PosiciNConsolidadaPage {
  CO_NombresADM:string;
  constructor(public userSession:UserSessionProvider, public navCtrl: NavController) {
    this.CO_NombresADM = userSession.CO_NombresADM;
  }
  goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeLaCuentaPage);
  }goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeTarjetaPage);
  }
}
