import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TransferenciasMismoTitularBFCPage } from '../transferencias-mismo-titular-bfc/transferencias-mismo-titular-bfc';
import { ConfirmaciNTransferenciaMismoTitularBFCPage } from '../confirmaci-ntransferencia-mismo-titular-bfc/confirmaci-ntransferencia-mismo-titular-bfc';
import { TransferenciaMismoTitularBFCReciboPage } from '../transferencia-mismo-titular-bfcrecibo/transferencia-mismo-titular-bfcrecibo';
import { PosiciNConsolidadaPage } from '../posici-nconsolidada/posici-nconsolidada';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { TransferenciaMismoTitularOtrosBancosPage } from '../transferencia-mismo-titular-otros-bancos/transferencia-mismo-titular-otros-bancos';
import { TransferenciaTercerosBFCPage } from '../transferencia-terceros-bfc/transferencia-terceros-bfc';
import { TransferenciasTercerosDetallePage } from '../transferencias-terceros-detalle/transferencias-terceros-detalle';
import { TransferenciaTercerosOtrosBancosPage } from '../transferencia-terceros-otros-bancos/transferencia-terceros-otros-bancos';
import { TransferenciaTercerosOtrosBancosReciboPage } from '../transferencia-terceros-otros-bancos-recibo/transferencia-terceros-otros-bancos-recibo';

@IonicPage({
  name: 'TransferenciasPage',
  segment: 'TransferenciasPage'
})
@Component({
  selector: 'page-transferencias',
  templateUrl: 'transferencias.html'
})
export class TransferenciasPage {

  constructor(public navCtrl: NavController) {
  }
  goToTransferenciasMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciasMismoTitularBFCPage');
  }goToConfirmaciNTransferenciaMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.push('ConfirmaciNTransferenciaMismoTitularBFCPage');
  }goToTransferenciaMismoTitularBFCRecibo(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciaMismoTitularBFCReciboPage');
  }goToPosiciNConsolidada(params){
    if (!params) params = {};
    this.navCtrl.push('PosiciNConsolidadaPage');
  }goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.push('DetalleDeLaCuentaPage');
  }goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.push('DetalleDeTarjetaPage');
  }goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciasPage');
  }goToTransferenciaMismoTitularOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciaMismoTitularOtrosBancosPage');
  }goToTransferenciaTercerosBFC(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciaTercerosBFCPage');
  }goToTransferenciasTercerosDetalle(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciasTercerosDetallePage');
  }goToTransferenciaTercerosOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciaTercerosOtrosBancosPage');
  }goToTransferenciaTercerosOtrosBancosRecibo(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciaTercerosOtrosBancosReciboPage');
  }
}
