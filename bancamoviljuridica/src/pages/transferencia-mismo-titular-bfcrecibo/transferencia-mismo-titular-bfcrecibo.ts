import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PosiciNConsolidadaPage } from '../posici-nconsolidada/posici-nconsolidada';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { TransferenciasPage } from '../transferencias/transferencias';
import { TransferenciasMismoTitularBFCPage } from '../transferencias-mismo-titular-bfc/transferencias-mismo-titular-bfc';
import { ConfirmaciNTransferenciaMismoTitularBFCPage } from '../confirmaci-ntransferencia-mismo-titular-bfc/confirmaci-ntransferencia-mismo-titular-bfc';
import { TransferenciaMismoTitularOtrosBancosPage } from '../transferencia-mismo-titular-otros-bancos/transferencia-mismo-titular-otros-bancos';
import { TransferenciaTercerosBFCPage } from '../transferencia-terceros-bfc/transferencia-terceros-bfc';
import { TransferenciasTercerosDetallePage } from '../transferencias-terceros-detalle/transferencias-terceros-detalle';
import { TransferenciaTercerosOtrosBancosPage } from '../transferencia-terceros-otros-bancos/transferencia-terceros-otros-bancos';
import { TransferenciaTercerosOtrosBancosReciboPage } from '../transferencia-terceros-otros-bancos-recibo/transferencia-terceros-otros-bancos-recibo';
import { WelcomePage } from '../welcome/welcome';
import { AprobacionRechazoPrincipalPage } from '../aprobacion-rechazo-principal/aprobacion-rechazo-principal';
import { SocialSharing } from '@ionic-native/social-sharing/';

@IonicPage({
  name: 'TransferenciaMismoTitularBFCReciboPage',
  segment: 'TransferenciaMismoTitularBFCReciboPage'
})
@Component({
  selector: 'page-transferencia-mismo-titular-bfcrecibo',
  templateUrl: 'transferencia-mismo-titular-bfcrecibo.html'
})
export class TransferenciaMismoTitularBFCReciboPage {
public cuentaDebito:string;
public cuentaCredito:string;
public referencia:string;
public montoValue:number;
public checkFirmas:string;
public estado:string; 
public checkAprobaciones:string;
public hours:number;
public minutes:number;
public day:number;
public month:number;
public year:number;
public hoursStr:string;
public minutesStr:string;
public dayStr:string;
public monthStr:string;
public yearStr:string;
public yearprint:string; 
public fecha:string;

  constructor(public socialSharing:SocialSharing, public navCtrl: NavController, public navParams: NavParams) {
    this.cuentaDebito = navParams.get('cuentaDebito');
    this.cuentaCredito = navParams.get('cuentaCredito');
    this.montoValue = navParams.get('montoValue');
    this.fecha = navParams.get('fecha');
    this.referencia = navParams.get('referencia');
    this.checkFirmas = navParams.get('checkFirmas');
    this.estado = navParams.get("estado");  
    this.checkAprobaciones = navParams.get("checkAprobaciones");
    this.hours= new Date().getHours();
    if (this.hours<10){
      this.hoursStr =  "0"+this.hours;
    } else {
      this.hoursStr =  ""+this.hours;
    }
    this.minutes= new Date().getMinutes();
    if (this.minutes<10){
      this.minutesStr =  "0"+this.minutes;
    } else {
      this.minutesStr =  ""+this.minutes;
    }
    this.day= new Date().getDate();
    if (this.day<10){
      this.dayStr =  "0"+this.day;
    } else {
      this.dayStr =  ""+this.day;
    }
    this.month = new Date().getMonth()+1;   
    if (this.month<10){
      this.monthStr =  "0"+this.month;
    } else {
      this.monthStr =  ""+this.month;
    }
    this.year = new Date().getFullYear();
    if (this.year<10){
      this.yearStr =  "0"+this.year;
    } else {
      this.yearStr =  ""+this.year;
    }
    this.yearprint = this.year.toString().substr(-2);
    this.fecha = this.day.toString()+"/"+this.month.toString()+"/"+this.yearprint;

  }
  generateImage(){
    var htmlToImage = require('html-to-image');
    var download = require("downloadjs");
    var self = this;
   htmlToImage.toPng(document.getElementById('recibo'), self)
        .then(function (dataUrl) {
          download(dataUrl, 'my-node.png');
         
          self.socialSharing.share("", "", dataUrl, "").then(() => {

    }).catch(() => {
      //Hacer la descarga de la imagen y el share de whatsapp aca
      console.log('Error sharing', 'error');
    });
   });
  }

  goToAprobacionRechazo(params){
    if (!params) params = {};
    this.navCtrl.setRoot('AprobacionRechazoPrincipalPage');
  }
  goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.setRoot('TransferenciasPage');
  }
  goToWelcome(params){
    if (!params) params = {};
    this.navCtrl.setRoot('WelcomePage');

  }

  goToPosiciNConsolidada(params){
    if (!params) params = {};
    this.navCtrl.push('PosiciNConsolidadaPage');
  }goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.push('DetalleDeLaCuentaPage');
  }goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.push('DetalleDeTarjetaPage');
  }goToTransferenciasMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciasMismoTitularBFCPage');
  }goToConfirmaciNTransferenciaMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.push('ConfirmaciNTransferenciaMismoTitularBFCPage');
  }goToTransferenciaMismoTitularBFCRecibo(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciaMismoTitularBFCReciboPage');
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
