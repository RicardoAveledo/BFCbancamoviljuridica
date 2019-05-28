import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AprobacionRechazoListaPrincipalPage } from './aprobacion-rechazo-lista-principal';

@NgModule({
  declarations: [
    AprobacionRechazoListaPrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(AprobacionRechazoListaPrincipalPage),
  ],
  exports: [
    AprobacionRechazoListaPrincipalPage
  ]
})
export class AprobacionRechazoListaPrincipalPageModule {}
