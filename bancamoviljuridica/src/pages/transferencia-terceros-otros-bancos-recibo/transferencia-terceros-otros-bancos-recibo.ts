import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TransferenciasPage } from '../transferencias/transferencias';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-transferencia-terceros-otros-bancos-recibo',
  templateUrl: 'transferencia-terceros-otros-bancos-recibo.html'
})
export class TransferenciaTercerosOtrosBancosReciboPage {

  constructor(public navCtrl: NavController) {
  }
  goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TransferenciasPage);
  }goToWelcome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(WelcomePage);
  }
}
