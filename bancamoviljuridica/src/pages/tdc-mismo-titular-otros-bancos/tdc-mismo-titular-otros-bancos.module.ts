import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TdcMismoTitularOtrosBancosPage } from './tdc-mismo-titular-otros-bancos';

@NgModule({
  declarations: [
    TdcMismoTitularOtrosBancosPage,
  ],
  imports: [
    IonicPageModule.forChild(TdcMismoTitularOtrosBancosPage),
  ],
  exports: [
    TdcMismoTitularOtrosBancosPage
  ]
})
export class TdcMismoTitularOtrosBancosPageModule {}
