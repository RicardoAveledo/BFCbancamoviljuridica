import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciaMismoTitularOtrosBancosConfirmarPage } from './transferencia-mismo-titular-otros-bancos-confirmar';

@NgModule({
  declarations: [
    TransferenciaMismoTitularOtrosBancosConfirmarPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciaMismoTitularOtrosBancosConfirmarPage),
  ],
  exports: [
    TransferenciaMismoTitularOtrosBancosConfirmarPage
  ]
})
export class TransferenciaMismoTitularOtrosBancosConfirmarPageModule {}
