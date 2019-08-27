import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciaMismoTitularOtrosBancosDetallePage } from './transferencia-mismo-titular-otros-bancos-detalle';

@NgModule({
  declarations: [
    TransferenciaMismoTitularOtrosBancosDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciaMismoTitularOtrosBancosDetallePage),
  ],
  exports: [
    TransferenciaMismoTitularOtrosBancosDetallePage
  ]
})
export class TransferenciaMismoTitularOtrosBancosDetallePageModule {}
