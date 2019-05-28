import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleDeLaCuentaPage } from './detalle-de-la-cuenta';

@NgModule({
  declarations: [
    DetalleDeLaCuentaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleDeLaCuentaPage),
  ],
  exports: [
    DetalleDeLaCuentaPage
  ]
})
export class DetalleDeLaCuentaPageModule {}
