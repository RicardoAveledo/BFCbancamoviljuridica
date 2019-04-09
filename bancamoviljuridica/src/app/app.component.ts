import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PosiciNConsolidadaPage } from '../pages/posici-nconsolidada/posici-nconsolidada';
import { DetalleDeLaCuentaPage } from '../pages/detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../pages/detalle-de-tarjeta/detalle-de-tarjeta';
import { TransferenciasPage } from '../pages/transferencias/transferencias';
import { TransferenciasMismoTitularBFCPage } from '../pages/transferencias-mismo-titular-bfc/transferencias-mismo-titular-bfc';
import { ConfirmaciNTransferenciaMismoTitularBFCPage } from '../pages/confirmaci-ntransferencia-mismo-titular-bfc/confirmaci-ntransferencia-mismo-titular-bfc';
import { TransferenciaMismoTitularBFCReciboPage } from '../pages/transferencia-mismo-titular-bfcrecibo/transferencia-mismo-titular-bfcrecibo';
import { TransferenciaMismoTitularOtrosBancosPage } from '../pages/transferencia-mismo-titular-otros-bancos/transferencia-mismo-titular-otros-bancos';
import { TransferenciaTercerosBFCPage } from '../pages/transferencia-terceros-bfc/transferencia-terceros-bfc';
import { TransferenciasTercerosDetallePage } from '../pages/transferencias-terceros-detalle/transferencias-terceros-detalle';
import { TransferenciaTercerosOtrosBancosPage } from '../pages/transferencia-terceros-otros-bancos/transferencia-terceros-otros-bancos';
import { TransferenciaTercerosOtrosBancosReciboPage } from '../pages/transferencia-terceros-otros-bancos-recibo/transferencia-terceros-otros-bancos-recibo';
import { OperacionesDeTDCPage } from '../pages/operaciones-de-tdc/operaciones-de-tdc';
import { AprobaciNRechazoPage } from '../pages/aprobaci-nrechazo/aprobaci-nrechazo';


import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { UserSessionProvider } from '../providers/user-session/user-session';

import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Events } from 'ionic-angular';
import { AprobacionRechazoPrincipalPage } from '../pages/aprobacion-rechazo-principal/aprobacion-rechazo-principal';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;
  public posicionConsolidada:boolean = true;
  public transferencias:boolean = true;
  public tdc:boolean = true;
  public ar:boolean = true;
  public validarPC:boolean=true;
  public validarTR:boolean=true;
  public validarTDC:boolean=true;
  public validarAPR:boolean=true;

  constructor(public userSession:UserSessionProvider, public events:Events, platform: Platform, 
    statusBar: StatusBar, splashScreen: SplashScreen, private toastCtrl: ToastController) {
    events.subscribe('session:created', (validador) => {
      this.validarPC = this.userSession.validarPC;
      this.validarTR = this.userSession.validarTR;
      this.validarTDC = this.userSession.validarTDC;
      this.validarAPR = this.userSession.validarAPR;
    });
    events.publish('session:created', true);
    //this.userSession.validar = this.validar;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      //message: 'Por favor, introduzca su nombre de usuario y clave para continuar',
      message:'No posee privilegios creados para esta transacción, Contacte al Usuario Administrador',
      duration: 3000,
      position: 'botton'
    });
    toast.onDidDismiss(() => {

    });
    toast.present();
  }

  opcionBloqueada(){
    this.presentToast();
  }

  goToPosiciNConsolidada(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PosiciNConsolidadaPage);
    this.posicionConsolidada = !this.posicionConsolidada;
    this.transferencias = true;
    this.ar = true;
    this.tdc = true;
  }
  goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TransferenciasPage);
    this.transferencias = !this.transferencias;
    this.posicionConsolidada = true;
    this.tdc = true;
    this.ar = true;
  }

  goToOperacionesDeTDC(params){
    if (!params) params = {};
    this.navCtrl.setRoot(OperacionesDeTDCPage);
    this.tdc = !this.tdc;
    this.ar = true;
    this.transferencias = true;
    this.posicionConsolidada = true;
  }

  goToAprobaciNRechazo(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AprobacionRechazoPrincipalPage);
    this.ar = !this.ar;
    this.tdc = true;
    this.transferencias = true;
    this.posicionConsolidada = true;
  }

  goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.setRoot(DetalleDeLaCuentaPage);
  }goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.setRoot(DetalleDeTarjetaPage);
  }
  goToTransferenciasMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TransferenciasMismoTitularBFCPage);
  }goToConfirmaciNTransferenciaMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ConfirmaciNTransferenciaMismoTitularBFCPage);
  }goToTransferenciaMismoTitularBFCRecibo(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TransferenciaMismoTitularBFCReciboPage);
  }goToTransferenciaMismoTitularOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TransferenciaMismoTitularOtrosBancosPage);
  }goToTransferenciaTercerosBFC(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TransferenciaTercerosBFCPage);
  }goToTransferenciasTercerosDetalle(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TransferenciasTercerosDetallePage);
  }goToTransferenciaTercerosOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TransferenciaTercerosOtrosBancosPage);
  }goToTransferenciaTercerosOtrosBancosRecibo(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TransferenciaTercerosOtrosBancosReciboPage);
  }goToSalir(params){
    this.userSession.validarAPR=false;
    this.userSession.validarPC=false;
    this.userSession.validarTDC=false;
    this.userSession.validarTR=false;
    this.events.publish('session:created', true);
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }goToWelcome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(WelcomePage);
  }
}
