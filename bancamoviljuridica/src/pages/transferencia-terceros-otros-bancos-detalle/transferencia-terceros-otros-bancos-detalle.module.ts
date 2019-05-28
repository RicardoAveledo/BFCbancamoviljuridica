import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciaTercerosOtrosBancosDetallePage } from './transferencia-terceros-otros-bancos-detalle';

@NgModule({
  declarations: [
    TransferenciaTercerosOtrosBancosDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciaTercerosOtrosBancosDetallePage),
  ],
  exports: [
    TransferenciaTercerosOtrosBancosDetallePage
  ]
})
export class TransferenciaTercerosOtrosBancosDetallePageModule {}
