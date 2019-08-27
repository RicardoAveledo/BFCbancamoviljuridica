import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagoTdcMismoTitularBfcConfirmarPage } from './pago-tdc-mismo-titular-bfc-confirmar';

@NgModule({
  declarations: [
    PagoTdcMismoTitularBfcConfirmarPage,
  ],
  imports: [
    IonicPageModule.forChild(PagoTdcMismoTitularBfcConfirmarPage),
  ],
  exports: [
    PagoTdcMismoTitularBfcConfirmarPage
  ]
})
export class PagoTdcMismoTitularBfcConfirmarPageModule {}
