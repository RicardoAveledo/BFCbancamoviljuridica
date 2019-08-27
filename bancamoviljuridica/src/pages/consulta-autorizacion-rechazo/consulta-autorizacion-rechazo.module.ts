import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultaAutorizacionRechazoPage } from './consulta-autorizacion-rechazo';

@NgModule({
  declarations: [
    ConsultaAutorizacionRechazoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultaAutorizacionRechazoPage),
  ],
  exports: [
    ConsultaAutorizacionRechazoPage
  ]
})
export class ConsultaAutorizacionRechazoPageModule {}
