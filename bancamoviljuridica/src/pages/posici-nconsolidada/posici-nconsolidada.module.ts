import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PosiciNConsolidadaPage } from './posici-nconsolidada';

@NgModule({
  declarations: [
    PosiciNConsolidadaPage,
  ],
  imports: [
    IonicPageModule.forChild(PosiciNConsolidadaPage),
  ],
  exports: [
    PosiciNConsolidadaPage
  ]
})
export class PosiciNConsolidadaPageModule {}
