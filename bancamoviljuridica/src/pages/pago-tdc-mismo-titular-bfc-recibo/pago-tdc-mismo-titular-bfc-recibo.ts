import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { TransferenciasPage } from '../transferencias/transferencias';
import { OperacionesDeTDCPage } from '../operaciones-de-tdc/operaciones-de-tdc';
import { AprobacionRechazoPrincipalPage } from '../aprobacion-rechazo-principal/aprobacion-rechazo-principal';

import { SocialSharing } from '@ionic-native/social-sharing/';
/**
 * Generated class for the PagoTdcMismoTitularBfcReciboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PagoTdcMismoTitularBfcReciboPage',
  segment: 'PagoTdcMismoTitularBfcReciboPage'
})
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
  public fechaToSend:string;
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

    constructor(public socialSharing:SocialSharing, public navCtrl: NavController, public navParams: NavParams) {
      this.cuentaDebito = navParams.get('cuentaDebito');
      this.cuentaCredito = navParams.get('cuentaCredito');
      this.montoValue = navParams.get('montoValue');
      this.fecha = navParams.get('fecha');
      this.referencia = navParams.get('referencia');
      this.checkFirmas = navParams.get('checkFirmas');
      this.fechaToSend = navParams.get('fechaToSend');
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
      this.fechaToSend = this.day.toString()+"/"+this.month.toString()+"/"+this.year.toString();
    }
    
    goToTDC(params){
      if (!params) params = {};
      this.navCtrl.setRoot('OperacionesDeTDCPage');
    }
    goToWelcome(params){
      if (!params) params = {};
      this.navCtrl.setRoot('WelcomePage');
  
    }
goToAprobacionRechazo(params){
    if (!params) params = {};
    this.navCtrl.setRoot('AprobacionRechazoPrincipalPage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PagoTdcMismoTitularBfcReciboPage');
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
}
