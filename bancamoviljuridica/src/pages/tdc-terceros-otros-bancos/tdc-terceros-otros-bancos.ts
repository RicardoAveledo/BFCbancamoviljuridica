import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TdcTercerosOtrosBancosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TdcTercerosOtrosBancosPage',
  segment: 'TdcTercerosOtrosBancosPage'
})
@Component({
  selector: 'page-tdc-terceros-otros-bancos',
  templateUrl: 'tdc-terceros-otros-bancos.html',
})
export class TdcTercerosOtrosBancosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TdcTercerosOtrosBancosPage');
  }

  
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }
}
