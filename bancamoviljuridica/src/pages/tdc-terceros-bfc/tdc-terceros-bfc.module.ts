import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TdcTercerosBfcPage } from './tdc-terceros-bfc';

@NgModule({
  declarations: [
    TdcTercerosBfcPage,
  ],
  imports: [
    IonicPageModule.forChild(TdcTercerosBfcPage),
  ],
  exports: [
    TdcTercerosBfcPage
  ]
})
export class TdcTercerosBfcPageModule {}
