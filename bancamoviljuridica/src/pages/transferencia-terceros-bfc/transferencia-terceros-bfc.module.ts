import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciaTercerosBFCPage } from './transferencia-terceros-bfc';

@NgModule({
  declarations: [
    TransferenciaTercerosBFCPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciaTercerosBFCPage),
  ],
  exports: [
    TransferenciaTercerosBFCPage
  ]
})
export class TransferenciaTercerosBFCPageModule {}
