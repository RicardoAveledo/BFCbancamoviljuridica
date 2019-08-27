import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TdcTercerosOtrosBancosPage } from './tdc-terceros-otros-bancos';

@NgModule({
  declarations: [
    TdcTercerosOtrosBancosPage,
  ],
  imports: [
    IonicPageModule.forChild(TdcTercerosOtrosBancosPage),
  ],
  exports: [
    TdcTercerosOtrosBancosPage
  ]
})
export class TdcTercerosOtrosBancosPageModule {}
