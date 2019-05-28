import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciaTercerosOtrosBancosPage } from './transferencia-terceros-otros-bancos';

@NgModule({
  declarations: [
    TransferenciaTercerosOtrosBancosPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciaTercerosOtrosBancosPage),
  ],
  exports: [
    TransferenciaTercerosOtrosBancosPage
  ]
})
export class TransferenciaTercerosOtrosBancosPageModule {}
