import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TransferenciasPage } from '../transferencias/transferencias';
import { WelcomePage } from '../welcome/welcome';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { AprobacionRechazoPrincipalPage } from '../aprobacion-rechazo-principal/aprobacion-rechazo-principal';
import { SocialSharing } from '@ionic-native/social-sharing/';

@IonicPage({
  name: 'TransferenciaTercerosOtrosBancosReciboPage',
  segment: 'TransferenciaTercerosOtrosBancosReciboPage'
})
@Component({
  selector: 'page-transferencia-terceros-otros-bancos-recibo',
  templateUrl: 'transferencia-terceros-otros-bancos-recibo.html'
})
export class TransferenciaTercerosOtrosBancosReciboPage {


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
    console.log("Trajo esto: ", this.cuentaDebito+ " - "+
    this.cuentaCredito + " - "+
    this.cuentaDebitoFull + " - "+
    this.cuentaCreditoFull + " - "+
    this.nombre + " - "+
    this.ciNo + " - "+
    this.ciType + " - "+
    this.email + " - "+
    this.sdisponible + " - "+
    this.conceptoValue + " - "+
    this.montoValue + " - "+
    this.motivo + " - "+
    this.fechaToSend + " - "+
    this.bankName + " - "+
    this.referencia
    );
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferenciaMismoTitularOtrosBancosReciboPage');
  }
goToAprobacionRechazo(params){
    if (!params) params = {};
    this.navCtrl.setRoot('AprobacionRechazoPrincipalPage');
  }
  goToWelcome(params){
    if (!params) params = {};
    this.navCtrl.setRoot('WelcomePage');
  }

 
  goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.setRoot('TransferenciasPage');
  }
}
