import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciaMismoTitularOtrosBancosPage } from './transferencia-mismo-titular-otros-bancos';

@NgModule({
  declarations: [
    TransferenciaMismoTitularOtrosBancosPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciaMismoTitularOtrosBancosPage),
  ],
  exports: [
    TransferenciaMismoTitularOtrosBancosPage
  ]
})
export class TransferenciaMismoTitularOtrosBancosPageModule {}
