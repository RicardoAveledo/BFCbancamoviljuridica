import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConsultaAutorizacionRechazoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'ConsultaAutorizacionRechazoPage',
  segment: 'ConsultaAutorizacionRechazoPage'
})
@Component({
  selector: 'page-consulta-autorizacion-rechazo',
  templateUrl: 'consulta-autorizacion-rechazo.html',
})
export class ConsultaAutorizacionRechazoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultaAutorizacionRechazoPage');
  }

}
