import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciaTercerosOtrosBancosReciboPage } from './transferencia-terceros-otros-bancos-recibo';

@NgModule({
  declarations: [
    TransferenciaTercerosOtrosBancosReciboPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciaTercerosOtrosBancosReciboPage),
  ],
  exports: [
    TransferenciaTercerosOtrosBancosReciboPage
  ]
})
export class TransferenciaTercerosOtrosBancosReciboPageModule {}
