import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TdcMismoTitularBfcPage } from '../tdc-mismo-titular-bfc/tdc-mismo-titular-bfc';
import { TdcTercerosBfcPage } from '../tdc-terceros-bfc/tdc-terceros-bfc';
import { TdcMismoTitularOtrosBancosPage } from '../tdc-mismo-titular-otros-bancos/tdc-mismo-titular-otros-bancos';
import { TdcTercerosOtrosBancosPage } from '../tdc-terceros-otros-bancos/tdc-terceros-otros-bancos';
import { PagoTdcMismoTitularBfcPage } from '../pago-tdc-mismo-titular-bfc/pago-tdc-mismo-titular-bfc';
import { PagoTdcTercerosBfcPage } from '../pago-tdc-terceros-bfc/pago-tdc-terceros-bfc';
import { PagoTdcMismoTitularOtrosBancosPage } from '../pago-tdc-mismo-titular-otros-bancos/pago-tdc-mismo-titular-otros-bancos';
import { PagoTdcTercerosOtrosBancosPage } from '../pago-tdc-terceros-otros-bancos/pago-tdc-terceros-otros-bancos';

@IonicPage({
  name: 'OperacionesDeTDCPage',
  segment: 'OperacionesDeTDCPage'
})
@Component({
  selector: 'page-operaciones-de-tdc',
  templateUrl: 'operaciones-de-tdc.html'
})
export class OperacionesDeTDCPage {

  constructor(public navCtrl: NavController) {
  }

  goToTDCMismoTitularBFC(params){  
    if (!params) params = {};
    this.navCtrl.push('PagoTdcMismoTitularBfcPage');
  }
  goToTDCTercerosBFC(params){ 
    if (!params) params = {};
    this.navCtrl.push('PagoTdcTercerosBfcPage');
  }
  goToTDCMismoTitularOtrosBancos(params){ 
    if (!params) params = {};
    this.navCtrl.push('PagoTdcMismoTitularOtrosBancosPage');
  }
  goToTDCTercerosOtrosBancos(params){ 
    if (!params) params = {};
    this.navCtrl.push('PagoTdcTercerosOtrosBancosPage');
  }
}
