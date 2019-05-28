import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagoTdcTercerosOtrosBancosDetallePage } from './pago-tdc-terceros-otros-bancos-detalle';

@NgModule({
  declarations: [
    PagoTdcTercerosOtrosBancosDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(PagoTdcTercerosOtrosBancosDetallePage),
  ],
  exports: [
    PagoTdcTercerosOtrosBancosDetallePage
  ]
})
export class PagoTdcTercerosOtrosBancosDetallePageModule {}
