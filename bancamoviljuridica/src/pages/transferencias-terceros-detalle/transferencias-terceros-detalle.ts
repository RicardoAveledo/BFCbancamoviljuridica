import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TransferenciaTercerosOtrosBancosPage } from '../transferencia-terceros-otros-bancos/transferencia-terceros-otros-bancos';
import { TransferenciaTercerosOtrosBancosReciboPage } from '../transferencia-terceros-otros-bancos-recibo/transferencia-terceros-otros-bancos-recibo';

@Component({
  selector: 'page-transferencias-terceros-detalle',
  templateUrl: 'transferencias-terceros-detalle.html'
})
export class TransferenciasTercerosDetallePage {

  constructor(public navCtrl: NavController) {
  }
  goToTransferenciaTercerosOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosPage);
  }goToTransferenciaTercerosOtrosBancosRecibo(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosReciboPage);
  }
}
