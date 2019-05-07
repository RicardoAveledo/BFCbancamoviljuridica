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

  constructor(public navCtrl: NavController, public httpClient: HttpClient, private viewCtrl: ViewController,
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

 
  goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TransferenciasPage);
  }
}
