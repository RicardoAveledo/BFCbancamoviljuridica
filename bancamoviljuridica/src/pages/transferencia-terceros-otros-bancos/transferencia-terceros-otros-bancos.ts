import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TransferenciaTercerosOtrosBancosReciboPage } from '../transferencia-terceros-otros-bancos-recibo/transferencia-terceros-otros-bancos-recibo';

@Component({
  selector: 'page-transferencia-terceros-otros-bancos',
  templateUrl: 'transferencia-terceros-otros-bancos.html'
})
export class TransferenciaTercerosOtrosBancosPage {

  constructor(public navCtrl: NavController) {
  }
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }
  goToTransferenciaTercerosOtrosBancosRecibo(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosReciboPage);
  }
}
