import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TdcMismoTitularOtrosBancosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tdc-mismo-titular-otros-bancos',
  templateUrl: 'tdc-mismo-titular-otros-bancos.html',
})
export class TdcMismoTitularOtrosBancosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TdcMismoTitularOtrosBancosPage');
  }

  
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }
}
