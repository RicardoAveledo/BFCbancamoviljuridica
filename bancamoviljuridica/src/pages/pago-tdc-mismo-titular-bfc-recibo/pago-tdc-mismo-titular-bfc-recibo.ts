import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { TransferenciasPage } from '../transferencias/transferencias';
import { OperacionesDeTDCPage } from '../operaciones-de-tdc/operaciones-de-tdc';
import { AprobacionRechazoPrincipalPage } from '../aprobacion-rechazo-principal/aprobacion-rechazo-principal';

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
  public estado:string;
  public checkAprobaciones:string;
  
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.cuentaDebito = navParams.get('cuentaDebito');
      this.cuentaCredito = navParams.get('cuentaCredito');
      this.montoValue = navParams.get('montoValue');
      this.fecha = navParams.get('fecha');
      this.referencia = navParams.get('referencia');
      this.checkFirmas = navParams.get('checkFirmas');
      this.estado = navParams.get("estado");
      this.checkAprobaciones = navParams.get("checkAprobaciones");
    }
    
    goToTDC(params){
      if (!params) params = {};
      this.navCtrl.setRoot(OperacionesDeTDCPage);
    }
    goToWelcome(params){
      if (!params) params = {};
      this.navCtrl.setRoot(WelcomePage);
  
    }
goToAprobacionRechazo(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AprobacionRechazoPrincipalPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PagoTdcMismoTitularBfcReciboPage');
  }

  generateImage(){
    var htmlToImage = require('html-to-image');
    var download = require("downloadjs");
   htmlToImage.toPng(document.getElementById('recibo'))
        .then(function (dataUrl) {
          download(dataUrl, 'my-node.png');
   });
  }
}
