import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciaMismoTitularBFCReciboPage } from './transferencia-mismo-titular-bfcrecibo';

@NgModule({
  declarations: [
    TransferenciaMismoTitularBFCReciboPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciaMismoTitularBFCReciboPage),
  ],
  exports: [
    TransferenciaMismoTitularBFCReciboPage
  ]
})
export class TransferenciaMismoTitularBFCReciboPageModule {}
