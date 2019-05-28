import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagoTdcMismoTitularOtrosBancosConfirmarPage } from './pago-tdc-mismo-titular-otros-bancos-confirmar';

@NgModule({
  declarations: [
    PagoTdcMismoTitularOtrosBancosConfirmarPage,
  ],
  imports: [
    IonicPageModule.forChild(PagoTdcMismoTitularOtrosBancosConfirmarPage),
  ],
  exports: [
    PagoTdcMismoTitularOtrosBancosConfirmarPage
  ]
})
export class PagoTdcMismoTitularOtrosBancosConfirmarPageModule {}
