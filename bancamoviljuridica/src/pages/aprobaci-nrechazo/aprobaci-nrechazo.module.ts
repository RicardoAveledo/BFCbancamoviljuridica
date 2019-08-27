import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AprobaciNRechazoPage } from './aprobaci-nrechazo';

@NgModule({
  declarations: [
    AprobaciNRechazoPage,
  ],
  imports: [
    IonicPageModule.forChild(AprobaciNRechazoPage),
  ],
  exports: [
    AprobaciNRechazoPage
  ]
})
export class AprobaciNRechazoPageModule {}
