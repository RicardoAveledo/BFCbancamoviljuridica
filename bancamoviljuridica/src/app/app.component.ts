import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
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



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToPosiciNConsolidada(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PosiciNConsolidadaPage);
  }goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.setRoot(DetalleDeLaCuentaPage);
  }goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.setRoot(DetalleDeTarjetaPage);
  }goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TransferenciasPage);
  }goToTransferenciasMismoTitularBFC(params){
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
  }goToOperacionesDeTDC(params){
    if (!params) params = {};
    this.navCtrl.setRoot(OperacionesDeTDCPage);
  }goToAprobaciNRechazo(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AprobaciNRechazoPage);
  }goToSalir(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }goToWelcome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(WelcomePage);
  }
}
