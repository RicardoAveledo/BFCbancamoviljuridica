import { Component } from '@angular/core';
import { IonicPage,ViewController, NavController, NavParams } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { WelcomePage } from '../welcome/welcome';
import { TransferenciaTercerosBFCPage } from '../transferencia-terceros-bfc/transferencia-terceros-bfc';
import { TransferenciasPage } from '../transferencias/transferencias';
import { OperacionesDeTDCPage } from '../operaciones-de-tdc/operaciones-de-tdc';
import { AprobacionRechazoPrincipalPage } from '../aprobacion-rechazo-principal/aprobacion-rechazo-principal';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/';
/**
 * Generated class for the PagoTdcTercerosBfcReciboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PagoTdcTercerosBfcReciboPage',
  segment: 'PagoTdcTercerosBfcReciboPage'
})
@Component({
  selector: 'page-pago-tdc-terceros-bfc-recibo',
  templateUrl: 'pago-tdc-terceros-bfc-recibo.html',
})
export class PagoTdcTercerosBfcReciboPage {

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
  public checkFirmas:string;
  public checkRechazo:string;
  public estado:string;
  public checkAprobaciones:string;

  constructor(public navCtrl: NavController, private file: File, 
    private fileOpener: FileOpener, 
    public socialSharing: SocialSharing, public httpClient: HttpClient, private viewCtrl: ViewController,
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
    this.referencia = navParams.get("referencia"); 
    this.checkFirmas = navParams.get("checkFirmas"); 
    this.checkRechazo = navParams.get("checkRechazo"); 
    this.estado = navParams.get("estado");
    this.checkAprobaciones = navParams.get("checkAprobaciones");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferenciasTercerosBfcReciboPage');
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

