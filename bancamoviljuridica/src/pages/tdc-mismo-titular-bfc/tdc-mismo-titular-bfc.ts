import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TdcMismoTitularBfcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tdc-mismo-titular-bfc',
  templateUrl: 'tdc-mismo-titular-bfc.html',
})
export class TdcMismoTitularBfcPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TdcMismoTitularBfcPage');
  }
  
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }

}
