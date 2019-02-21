import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'page-posici-nconsolidada',
  templateUrl: 'posici-nconsolidada.html'
})
export class PosiciNConsolidadaPage {
  CO_NOMBRES:string;
  public cuentas:any[]=[];
  public tdc:any[]=[];

  constructor(public userSession:UserSessionProvider, public navCtrl: NavController, public httpClient: HttpClient) {
    this.CO_NOMBRES = userSession.CO_NOMBRES;
    this.userSession.reloadAccountData();
    this.cuentas = userSession.cuentas;
    this.tdc = userSession.tdc;
  }


  goToDetalleDeLaCuenta(item:any[]){
    this.navCtrl.push(DetalleDeLaCuentaPage,{
      "cuentaselected":item,
      "posicion":item[5],
    });
  }
  goToDetalleDeTarjeta(item:any[]){
    this.navCtrl.push(DetalleDeTarjetaPage,{
      "cuentaselected":item,
      "posicion":item[5],
    });
  }
}
