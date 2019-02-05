import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TdcMismoTitularBfcPage } from '../tdc-mismo-titular-bfc/tdc-mismo-titular-bfc';
import { TdcTercerosBfcPage } from '../tdc-terceros-bfc/tdc-terceros-bfc';
import { TdcMismoTitularOtrosBancosPage } from '../tdc-mismo-titular-otros-bancos/tdc-mismo-titular-otros-bancos';
import { TdcTercerosOtrosBancosPage } from '../tdc-terceros-otros-bancos/tdc-terceros-otros-bancos';

@Component({
  selector: 'page-operaciones-de-tdc',
  templateUrl: 'operaciones-de-tdc.html'
})
export class OperacionesDeTDCPage {

  constructor(public navCtrl: NavController) {
  }

  goToTDCMismoTitularBFC(params){  
    if (!params) params = {};
    this.navCtrl.push(TdcMismoTitularBfcPage);
  }
  goToTDCTercerosBFC(params){ 
    if (!params) params = {};
    this.navCtrl.push(TdcTercerosBfcPage);
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
