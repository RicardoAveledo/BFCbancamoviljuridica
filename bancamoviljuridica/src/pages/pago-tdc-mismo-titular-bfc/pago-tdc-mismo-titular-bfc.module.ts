import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagoTdcMismoTitularBfcPage } from './pago-tdc-mismo-titular-bfc';

@NgModule({
  declarations: [
    PagoTdcMismoTitularBfcPage,
  ],
  imports: [
    IonicPageModule.forChild(PagoTdcMismoTitularBfcPage),
  ],
  exports: [
    PagoTdcMismoTitularBfcPage
  ]
})
export class PagoTdcMismoTitularBfcPageModule {}
