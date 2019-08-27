import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagoTdcTercerosOtrosBancosReciboPage } from './pago-tdc-terceros-otros-bancos-recibo';

@NgModule({
  declarations: [
    PagoTdcTercerosOtrosBancosReciboPage,
  ],
  imports: [
    IonicPageModule.forChild(PagoTdcTercerosOtrosBancosReciboPage),
  ],
  exports: [
    PagoTdcTercerosOtrosBancosReciboPage
  ]
})
export class PagoTdcTercerosOtrosBancosReciboPageModule {}
