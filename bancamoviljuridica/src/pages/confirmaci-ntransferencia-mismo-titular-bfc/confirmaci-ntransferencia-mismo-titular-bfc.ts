import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { TransferenciaMismoTitularBFCReciboPage } from '../transferencia-mismo-titular-bfcrecibo/transferencia-mismo-titular-bfcrecibo';
import { PosiciNConsolidadaPage } from '../posici-nconsolidada/posici-nconsolidada';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { TransferenciasPage } from '../transferencias/transferencias';
import { TransferenciasMismoTitularBFCPage } from '../transferencias-mismo-titular-bfc/transferencias-mismo-titular-bfc';
import { TransferenciaMismoTitularOtrosBancosPage } from '../transferencia-mismo-titular-otros-bancos/transferencia-mismo-titular-otros-bancos';
import { TransferenciaTercerosBFCPage } from '../transferencia-terceros-bfc/transferencia-terceros-bfc';
import { TransferenciasTercerosDetallePage } from '../transferencias-terceros-detalle/transferencias-terceros-detalle';
import { TransferenciaTercerosOtrosBancosPage } from '../transferencia-terceros-otros-bancos/transferencia-terceros-otros-bancos';
import { TransferenciaTercerosOtrosBancosReciboPage } from '../transferencia-terceros-otros-bancos-recibo/transferencia-terceros-otros-bancos-recibo';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-confirmaci-ntransferencia-mismo-titular-bfc',
  templateUrl: 'confirmaci-ntransferencia-mismo-titular-bfc.html'
})
export class ConfirmaciNTransferenciaMismoTitularBFCPage {
  cuentaDebito:string;
  cuentaCredito:string;
  montoValue:number;

  confirmacion:boolean;



  constructor(public navCtrl: NavController, private viewCtrl: ViewController,
     public navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.cuentaDebito = navParams.get('cuentaDebito');
    this.cuentaCredito = navParams.get('cuentaCredito');
    this.montoValue = navParams.get('montoValue');
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.confirmacion = false;
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.confirmacion = true;
            
            this.navCtrl.push(TransferenciaMismoTitularBFCReciboPage,{
              "cuentaDebito":this.cuentaDebito,
              "cuentaCredito":this.cuentaCredito,
              "montoValue":this.montoValue
            });
            console.log('Comfirmar clicked');
          }
        }
      ]
    });
    alert.present();
  }

  changeValueCredit(value: any)
  {
    this.cuentaCredito=value
  }

  changeValueDebit(value: any)
  {
    this.cuentaDebito=value
  }



  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  goToTransferenciaMismoTitularBFCRecibo(params){

    this.presentConfirm();
    if (this.confirmacion==true)
    {
      if (!params) params = {};
      this.navCtrl.push(TransferenciaMismoTitularBFCReciboPage);
    }

  }
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }

  goToTransferenciasMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciasMismoTitularBFCPage);
  }
  goToPosiciNConsolidada(params){
    if (!params) params = {};
    this.navCtrl.push(PosiciNConsolidadaPage);
  }goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeLaCuentaPage);
  }goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeTarjetaPage);
  }goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciasPage);
  }goToConfirmaciNTransferenciaMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.push(ConfirmaciNTransferenciaMismoTitularBFCPage);
  }goToTransferenciaMismoTitularOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaMismoTitularOtrosBancosPage);
  }goToTransferenciaTercerosBFC(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosBFCPage);
  }goToTransferenciasTercerosDetalle(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciasTercerosDetallePage);
  }goToTransferenciaTercerosOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosPage);
  }goToTransferenciaTercerosOtrosBancosRecibo(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosReciboPage);
  }
}
