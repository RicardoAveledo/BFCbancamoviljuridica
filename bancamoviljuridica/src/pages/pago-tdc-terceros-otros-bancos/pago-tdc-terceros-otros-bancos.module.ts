import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagoTdcTercerosOtrosBancosPage } from './pago-tdc-terceros-otros-bancos';

@NgModule({
  declarations: [
    PagoTdcTercerosOtrosBancosPage,
  ],
  imports: [
    IonicPageModule.forChild(PagoTdcTercerosOtrosBancosPage),
  ],
  exports: [
    PagoTdcTercerosOtrosBancosPage
  ]
})
export class PagoTdcTercerosOtrosBancosPageModule {}
