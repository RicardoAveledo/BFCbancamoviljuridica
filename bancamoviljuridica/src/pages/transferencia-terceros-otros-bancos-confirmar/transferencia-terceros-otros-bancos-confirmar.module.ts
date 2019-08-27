import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciaTercerosOtrosBancosConfirmarPage } from './transferencia-terceros-otros-bancos-confirmar';

@NgModule({
  declarations: [
    TransferenciaTercerosOtrosBancosConfirmarPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciaTercerosOtrosBancosConfirmarPage),
  ],
  exports: [
    TransferenciaTercerosOtrosBancosConfirmarPage
  ]
})
export class TransferenciaTercerosOtrosBancosConfirmarPageModule {}
