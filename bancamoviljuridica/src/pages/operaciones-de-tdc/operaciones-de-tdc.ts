import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TdcMismoTitularBfcPage } from '../tdc-mismo-titular-bfc/tdc-mismo-titular-bfc';
import { TdcTercerosBfcPage } from '../tdc-terceros-bfc/tdc-terceros-bfc';
import { TdcMismoTitularOtrosBancosPage } from '../tdc-mismo-titular-otros-bancos/tdc-mismo-titular-otros-bancos';
import { TdcTercerosOtrosBancosPage } from '../tdc-terceros-otros-bancos/tdc-terceros-otros-bancos';
import { PagoTdcMismoTitularBfcPage } from '../pago-tdc-mismo-titular-bfc/pago-tdc-mismo-titular-bfc';
import { PagoTdcTercerosBfcPage } from '../pago-tdc-terceros-bfc/pago-tdc-terceros-bfc';

@Component({
  selector: 'page-operaciones-de-tdc',
  templateUrl: 'operaciones-de-tdc.html'
})
export class OperacionesDeTDCPage {

  constructor(public navCtrl: NavController) {
  }

  goToTDCMismoTitularBFC(params){  
    if (!params) params = {};
    this.navCtrl.push(PagoTdcMismoTitularBfcPage);
  }
  goToTDCTercerosBFC(params){ 
    if (!params) params = {};
    this.navCtrl.push(PagoTdcTercerosBfcPage);
  }
  goToTDCMismoTitularOtrosBancos(params){ 
    if (!params) params = {};
    this.navCtrl.push(TdcMismoTitularOtrosBancosPage);
  }
  goToTDCTercerosOtrosBancos(params){ 
    if (!params) params = {};
    this.navCtrl.push(TdcTercerosOtrosBancosPage);
  }
}
