import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciasPage } from './transferencias';

@NgModule({
  declarations: [
    TransferenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciasPage),
  ],
  exports: [
    TransferenciasPage
  ]
})
export class TransferenciasPageModule {}
