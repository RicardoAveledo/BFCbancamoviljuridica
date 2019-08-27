import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleDeTarjetaPage } from './detalle-de-tarjeta';

@NgModule({
  declarations: [
    DetalleDeTarjetaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleDeTarjetaPage),
  ],
  exports: [
    DetalleDeTarjetaPage
  ]
})
export class DetalleDeTarjetaPageModule {}
