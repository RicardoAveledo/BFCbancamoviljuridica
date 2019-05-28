import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AprobacionRechazoConsultaPage } from './aprobacion-rechazo-consulta';

@NgModule({
  declarations: [
    AprobacionRechazoConsultaPage,
  ],
  imports: [
    IonicPageModule.forChild(AprobacionRechazoConsultaPage),
  ],
  exports: [
    AprobacionRechazoConsultaPage
  ]
})
export class AprobacionRechazoConsultaPageModule {}
