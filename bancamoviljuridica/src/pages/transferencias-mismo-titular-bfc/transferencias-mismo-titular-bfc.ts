import { Component } from '@angular/core';
import { NavController, Toast } from 'ionic-angular';
import { ConfirmaciNTransferenciaMismoTitularBFCPage } from '../confirmaci-ntransferencia-mismo-titular-bfc/confirmaci-ntransferencia-mismo-titular-bfc';
import { TransferenciaMismoTitularBFCReciboPage } from '../transferencia-mismo-titular-bfcrecibo/transferencia-mismo-titular-bfcrecibo';
import { PosiciNConsolidadaPage } from '../posici-nconsolidada/posici-nconsolidada';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { TransferenciasPage } from '../transferencias/transferencias';
import { TransferenciaMismoTitularOtrosBancosPage } from '../transferencia-mismo-titular-otros-bancos/transferencia-mismo-titular-otros-bancos';
import { TransferenciaTercerosBFCPage } from '../transferencia-terceros-bfc/transferencia-terceros-bfc';
import { TransferenciasTercerosDetallePage } from '../transferencias-terceros-detalle/transferencias-terceros-detalle';
import { TransferenciaTercerosOtrosBancosPage } from '../transferencia-terceros-otros-bancos/transferencia-terceros-otros-bancos';
import { TransferenciaTercerosOtrosBancosReciboPage } from '../transferencia-terceros-otros-bancos-recibo/transferencia-terceros-otros-bancos-recibo';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-transferencias-mismo-titular-bfc',
  templateUrl: 'transferencias-mismo-titular-bfc.html'
})
export class TransferenciasMismoTitularBFCPage {
  cuentaDebito:string;
  cuentaCredito:string;
  montoValue:number;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, 
  private toastCtrl: ToastController, private alertCtrl: AlertController) {
  }

  changeValueCredit(value: any)
  {
    this.cuentaCredito=value
  }

  changeValueDebit(value: any)
  {

    this.cuentaDebito=value
  }


  showAlert(mensaje: string) {
    const alert = this.alertCtrl.create({
      title: 'BFC',
      subTitle: mensaje ,
      buttons: ['OK']
    });
    alert.present();
  }
  
  
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }


  cuentadebitoForm = this.formBuilder.group({
    cuentadebito: ['',Validators.required]
  });

  cuentacreditoForm = this.formBuilder.group({
    cuentacredito: ['',Validators.required]
  });

  montoForm = this.formBuilder.group({
    monto: ['',Validators.required]
  });
  

  goToTransferenciasMismoTitularBFC(params){
    if (this.cuentacreditoForm.valid && this.cuentadebitoForm.valid && this.montoForm.valid)
  {
    if (!params) params = {};
    this.navCtrl.push(TransferenciasMismoTitularBFCPage);


  } else{
  }

  if(this.cuentacreditoForm.valid)
{

}
  }

  //Método que utiliza el boton de Continuar
  goToConfirmaciNTransferenciaMismoTitularBFC(params){
    if (this.cuentacreditoForm.valid && this.cuentadebitoForm.valid && this.montoForm.valid)
    {
      if (!params) params = {};
      this.navCtrl.push(ConfirmaciNTransferenciaMismoTitularBFCPage,{
        "cuentaDebito":this.cuentaDebito,
        "cuentaCredito":this.cuentaCredito,
        "montoValue":this.montoValue
      });
  } else{

    if (this.cuentadebitoForm.invalid)
    {
      this.showAlert('Debe seleccionar la cuenta origen');
    }

    else {
      if (this.cuentacreditoForm.invalid)
      {
        this.showAlert('Debe seleccionar la cuenta destino');
      }

      else {
        if (this.montoForm.invalid)
        {
          this.showAlert('Debe colocar un monto');
        }
      }

    }
  }


  }


  goToTransferenciaMismoTitularBFCRecibo(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaMismoTitularBFCReciboPage);
  }
  goToPosiciNConsolidada(params){
    if (!params) params = {};
    this.navCtrl.push(PosiciNConsolidadaPage);
  }
  goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeLaCuentaPage);
  }
  goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeTarjetaPage);
  }
  goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciasPage);
  }
  goToTransferenciaMismoTitularOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaMismoTitularOtrosBancosPage);
  }
  goToTransferenciaTercerosBFC(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosBFCPage);
  }
  goToTransferenciasTercerosDetalle(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciasTercerosDetallePage);
  }
  goToTransferenciaTercerosOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosPage);
  }
  goToTransferenciaTercerosOtrosBancosRecibo(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosReciboPage);
  }
}


