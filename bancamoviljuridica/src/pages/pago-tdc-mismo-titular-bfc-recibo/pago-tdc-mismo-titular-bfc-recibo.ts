import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { TransferenciasPage } from '../transferencias/transferencias';
import { OperacionesDeTDCPage } from '../operaciones-de-tdc/operaciones-de-tdc';

/**
 * Generated class for the PagoTdcMismoTitularBfcReciboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pago-tdc-mismo-titular-bfc-recibo',
  templateUrl: 'pago-tdc-mismo-titular-bfc-recibo.html',
})
export class PagoTdcMismoTitularBfcReciboPage {
  public cuentaDebito:string;
  public cuentaCredito:string;
  public fecha:string;
  public referencia:string;
  public montoValue:number;
  public checkFirmas:string;
  
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.cuentaDebito = navParams.get('cuentaDebito');
      this.cuentaCredito = navParams.get('cuentaCredito');
      this.montoValue = navParams.get('montoValue');
      this.fecha = navParams.get('fecha');
      this.referencia = navParams.get('referencia');
      this.checkFirmas = navParams.get('checkFirmas');
    }
    
    goToTDC(params){
      if (!params) params = {};
      this.navCtrl.setRoot(OperacionesDeTDCPage);
    }
    goToWelcome(params){
      if (!params) params = {};
      this.navCtrl.setRoot(WelcomePage);
  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagoTdcMismoTitularBfcReciboPage');
  }

}
