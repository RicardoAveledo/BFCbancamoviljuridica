import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmaciNTransferenciaMismoTitularBFCPage } from './confirmaci-ntransferencia-mismo-titular-bfc';

@NgModule({
  declarations: [
    ConfirmaciNTransferenciaMismoTitularBFCPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmaciNTransferenciaMismoTitularBFCPage),
  ],
  exports: [
    ConfirmaciNTransferenciaMismoTitularBFCPage
  ]
})
export class ConfirmaciNTransferenciaMismoTitularBFCPageModule {}
