import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TdcMismoTitularBfcPage } from './tdc-mismo-titular-bfc';

@NgModule({
  declarations: [
    TdcMismoTitularBfcPage,
  ],
  imports: [
    IonicPageModule.forChild(TdcMismoTitularBfcPage),
  ],
  exports: [
    TdcMismoTitularBfcPage
  ]
})
export class TdcMismoTitularBfcPageModule {}
