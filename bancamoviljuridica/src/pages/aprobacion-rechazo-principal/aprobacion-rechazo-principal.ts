import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  }
  goToConsulta(params){

  }

}
