import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePrestamoPage } from './detalle-prestamo';

@NgModule({
  declarations: [
    DetallePrestamoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePrestamoPage),
  ],
  exports: [
    DetallePrestamoPage
  ]
})
export class DetallePrestamoPageModule {}
