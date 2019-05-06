import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AprobarRechazarProveedoresTokenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aprobar-rechazar-proveedores-token',
  templateUrl: 'aprobar-rechazar-proveedores-token.html',
})
export class AprobarRechazarProveedoresTokenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AprobarRechazarProveedoresTokenPage');
  }

}
