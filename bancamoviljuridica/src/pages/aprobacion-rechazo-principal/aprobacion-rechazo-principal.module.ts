import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AprobacionRechazoPrincipalPage } from './aprobacion-rechazo-principal';

@NgModule({
  declarations: [
    AprobacionRechazoPrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(AprobacionRechazoPrincipalPage),
  ],
  exports: [
    AprobacionRechazoPrincipalPage
  ]
})
export class AprobacionRechazoPrincipalPageModule {}
