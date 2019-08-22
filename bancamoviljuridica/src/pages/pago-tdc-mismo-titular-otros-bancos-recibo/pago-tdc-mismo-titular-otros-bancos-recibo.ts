import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { WelcomePage } from '../welcome/welcome';
import { TransferenciasPage } from '../transferencias/transferencias';
import { OperacionesDeTDCPage } from '../operaciones-de-tdc/operaciones-de-tdc';
import { AprobacionRechazoPrincipalPage } from '../aprobacion-rechazo-principal/aprobacion-rechazo-principal';

import { SocialSharing } from '@ionic-native/social-sharing/';
/**
 * Generated class for the PagoTdcMismoTitularOtrosBancosReciboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PagoTdcMismoTitularOtrosBancosReciboPage',
  segment: 'PagoTdcMismoTitularOtrosBancosReciboPage'
})
@Component({
  selector: 'page-pago-tdc-mismo-titular-otros-bancos-recibo',
  templateUrl: 'pago-tdc-mismo-titular-otros-bancos-recibo.html',
})
export class PagoTdcMismoTitularOtrosBancosReciboPage {

  public cuentaDebito:string;
  public cuentaCredito:string;
  public cuentaDebitoFull:string;
  public cuentaCreditoFull:string;
  public nombre:string;
  public ciNo:string;
  public ciType:string;
  public email:string;
  public sdisponible:string;
  public conceptoValue:string;
  public montoValue:string;
  public motivo:string;
  public confirmacion:boolean;
  public fechaToSend:string;
  public referencia:string;
  public bankName:string;
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

  constructor(public socialSharing:SocialSharing, public navCtrl: NavController, public httpClient: HttpClient, private viewCtrl: ViewController,
    public navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController,
    public userSession:UserSessionProvider) {
    this.cuentaDebito = navParams.get("cuentaDebito");
    this.cuentaCredito = navParams.get("cuentaCredito");
    this.cuentaDebitoFull = navParams.get("cuentaDebitoFull");
    this.cuentaCreditoFull = navParams.get("cuentaCreditoFull");
    this.nombre = navParams.get("nombre");
    this.ciNo = navParams.get("ciNo");
    this.ciType = navParams.get("ciType");
    this.email = navParams.get("email"); 
    this.sdisponible = navParams.get("sdisponible"); 
    this.conceptoValue = navParams.get("conceptoValue"); 
    this.montoValue = navParams.get("montoValue"); 
    this.motivo = navParams.get("motivo"); 
    this.fechaToSend = navParams.get("fechaToSend"); 
    this.bankName = navParams.get("bankName"); 
    this.referencia = navParams.get("referencia"); 
    this.checkFirmas = navParams.get("checkFirmas");
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad TDCMISMOTITULAROTROS');
  }

  goToWelcome(params){
    if (!params) params = {};
    this.navCtrl.setRoot('WelcomePage');
  }

 goToAprobacionRechazo(params){
    if (!params) params = {};
    this.navCtrl.setRoot('AprobacionRechazoPrincipalPage');
  }
  goToOperacionesTDC(params){
    if (!params) params = {};
    this.navCtrl.setRoot('OperacionesDeTDCPage');
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
