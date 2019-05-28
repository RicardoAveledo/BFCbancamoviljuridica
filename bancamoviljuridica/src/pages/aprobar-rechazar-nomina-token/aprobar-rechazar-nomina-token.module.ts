import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AprobarRechazarNominaTokenPage } from './aprobar-rechazar-nomina-token';

@NgModule({
  declarations: [
    AprobarRechazarNominaTokenPage,
  ],
  imports: [
    IonicPageModule.forChild(AprobarRechazarNominaTokenPage),
  ],
  exports: [
    AprobarRechazarNominaTokenPage
  ]
})
export class AprobarRechazarNominaTokenPageModule {}
