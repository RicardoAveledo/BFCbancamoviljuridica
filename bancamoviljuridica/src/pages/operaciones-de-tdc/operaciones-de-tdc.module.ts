import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperacionesDeTDCPage } from './operaciones-de-tdc';

@NgModule({
  declarations: [
    OperacionesDeTDCPage,
  ],
  imports: [
    IonicPageModule.forChild(OperacionesDeTDCPage),
  ],
  exports: [
    OperacionesDeTDCPage
  ]
})
export class OperacionesDeTDCPageModule {}
