import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagoTdcTercerosBfcPage } from './pago-tdc-terceros-bfc';

@NgModule({
  declarations: [
    PagoTdcTercerosBfcPage,
  ],
  imports: [
    IonicPageModule.forChild(PagoTdcTercerosBfcPage),
  ],
  exports: [
    PagoTdcTercerosBfcPage
  ]
})
export class PagoTdcTercerosBfcPageModule {}
