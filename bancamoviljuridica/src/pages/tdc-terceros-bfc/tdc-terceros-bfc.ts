import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TdcTercerosBfcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TdcTercerosBfcPage',
  segment: 'TdcTercerosBfcPage'
})
@Component({
  selector: 'page-tdc-terceros-bfc',
  templateUrl: 'tdc-terceros-bfc.html',
})
export class TdcTercerosBfcPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TdcTercerosBfcPage');
  }

  
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }
}
