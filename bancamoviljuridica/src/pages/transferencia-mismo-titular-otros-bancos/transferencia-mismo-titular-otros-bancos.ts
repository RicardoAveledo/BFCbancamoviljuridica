import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-transferencia-mismo-titular-otros-bancos',
  templateUrl: 'transferencia-mismo-titular-otros-bancos.html'
})
export class TransferenciaMismoTitularOtrosBancosPage {

  constructor(public navCtrl: NavController) {
  }
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }
}
