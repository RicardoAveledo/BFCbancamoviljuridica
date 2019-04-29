import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AprobacionRechazoConsultaPage } from '../aprobacion-rechazo-consulta/aprobacion-rechazo-consulta';
import { AprobacionRechazoListaPrincipalPage } from '../aprobacion-rechazo-lista-principal/aprobacion-rechazo-lista-principal';

/**
 * Generated class for the AprobacionRechazoPrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aprobacion-rechazo-principal',
  templateUrl: 'aprobacion-rechazo-principal.html',
})
export class AprobacionRechazoPrincipalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AprobacionRechazoPrincipalPage');
  }
  goToAutorizacion(params){
    this.navCtrl.push(AprobacionRechazoListaPrincipalPage);
  }
  goToConsulta(params){
    this.navCtrl.push(AprobacionRechazoConsultaPage);
  }

}
