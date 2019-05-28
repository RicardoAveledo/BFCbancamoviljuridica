import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AprobacionRechazoConsultaDetallePage } from './aprobacion-rechazo-consulta-detalle';

@NgModule({
  declarations: [
    AprobacionRechazoConsultaDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(AprobacionRechazoConsultaDetallePage),
  ],
  exports: [
    AprobacionRechazoConsultaDetallePage
  ]
})
export class AprobacionRechazoConsultaDetallePageModule {}