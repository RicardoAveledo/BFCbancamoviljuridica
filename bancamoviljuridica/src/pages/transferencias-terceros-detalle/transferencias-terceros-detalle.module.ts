import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciasTercerosDetallePage } from './transferencias-terceros-detalle';

@NgModule({
  declarations: [
    TransferenciasTercerosDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciasTercerosDetallePage),
  ],
  exports: [
    TransferenciasTercerosDetallePage
  ]
})
export class TransferenciasTercerosDetallePageModule {}
