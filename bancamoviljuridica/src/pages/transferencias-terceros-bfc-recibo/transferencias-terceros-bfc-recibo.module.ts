import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciasTercerosBfcReciboPage } from './transferencias-terceros-bfc-recibo';

@NgModule({
  declarations: [
    TransferenciasTercerosBfcReciboPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciasTercerosBfcReciboPage),
  ],
  exports: [
    TransferenciasTercerosBfcReciboPage
  ]
})
export class TransferenciasTercerosBfcReciboPageModule {}
