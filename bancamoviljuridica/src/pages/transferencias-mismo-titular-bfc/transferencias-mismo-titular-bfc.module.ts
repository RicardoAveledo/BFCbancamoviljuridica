import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciasMismoTitularBFCPage } from './transferencias-mismo-titular-bfc';

@NgModule({
  declarations: [
    TransferenciasMismoTitularBFCPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciasMismoTitularBFCPage),
  ],
  exports: [
    TransferenciasMismoTitularBFCPage
  ]
})
export class TransferenciasMismoTitularBFCPageModule {}
