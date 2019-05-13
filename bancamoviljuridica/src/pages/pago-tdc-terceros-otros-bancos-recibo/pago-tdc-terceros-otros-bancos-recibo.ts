import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TransferenciasPage } from '../transferencias/transferencias';
import { WelcomePage } from '../welcome/welcome';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { OperacionesDeTDCPage } from '../operaciones-de-tdc/operaciones-de-tdc';
import { AprobacionRechazoPrincipalPage } from '../aprobacion-rechazo-principal/aprobacion-rechazo-principal';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


/**
 * Generated class for the PagoTdcTercerosOtrosBancosReciboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pago-tdc-terceros-otros-bancos-recibo',
  templateUrl: 'pago-tdc-terceros-otros-bancos-recibo.html',
})
export class PagoTdcTercerosOtrosBancosReciboPage {
  

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
  public checkRechazo:string;
  public estado:string;
  public checkAprobaciones:string;

  constructor(public platform: Platform, private file: File, 
    private fileOpener: FileOpener, 
    private socialSharing: SocialSharing,
    public navCtrl: NavController, public httpClient: HttpClient, private viewCtrl: ViewController,
    public navParams: NavParams, private alertCtrl: AlertController, 
    private toastCtrl: ToastController, public userSession:UserSessionProvider) {
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
    this.checkRechazo = navParams.get("checkRechazo");
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferenciaMismoTitularOtrosBancosReciboPage');
  }
goToAprobacionRechazo(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AprobacionRechazoPrincipalPage);
  }
  goToWelcome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(WelcomePage);
  }

 
  goToTDC(params){
    if (!params) params = {};
    this.navCtrl.setRoot(OperacionesDeTDCPage);
  }
  
  
    


  generateImage(){
    var htmlToImage = require('html-to-image');
    var download = require("downloadjs");
    htmlToImage.toPng(document.getElementById('recibo'))
        .then(function (dataUrl) {
          download(dataUrl, 'recibo.png');
   });
   this.shareImg();
  }

  shareImg() { 
    let imageName = "recibo.jpg";
    const ROOT_DIRECTORY = 'file:///sdcard//';
    const downloadFolderName = 'tempDownloadFolder';
    
    //Create a folder in memory location
    this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
      .then((entries) => {
 
        //Copy our asset/img/FreakyJolly.jpg to folder we created
        this.file.copyFile(this.file.applicationDirectory + "www/assets/imgs/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
          .then((entries) => {
 
            //Common sharing event will open all available application to share
            this.socialSharing.share("Message","Subject", ROOT_DIRECTORY + downloadFolderName + "/" + imageName, imageName)
              .then((entries) => {
                console.log('success ' + JSON.stringify(entries));
              })
              .catch((error) => {
                alert('error ' + JSON.stringify(error));
              });
          })
          .catch((error) => {
            alert('error ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert('error ' + JSON.stringify(error));
      });
  }

}
