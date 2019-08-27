import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagoTdcMismoTitularOtrosBancosDetallePage } from './pago-tdc-mismo-titular-otros-bancos-detalle';

@NgModule({
  declarations: [
    PagoTdcMismoTitularOtrosBancosDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(PagoTdcMismoTitularOtrosBancosDetallePage),
  ],
  exports: [
    PagoTdcMismoTitularOtrosBancosDetallePage
  ]
})
export class PagoTdcMismoTitularOtrosBancosDetallePageModule {}
