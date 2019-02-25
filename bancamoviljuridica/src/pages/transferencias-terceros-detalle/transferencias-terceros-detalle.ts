import { Component } from '@angular/core';
import { NavController, Toast, NavParams } from 'ionic-angular';
import { TransferenciaTercerosOtrosBancosPage } from '../transferencia-terceros-otros-bancos/transferencia-terceros-otros-bancos';
import { TransferenciaTercerosOtrosBancosReciboPage } from '../transferencia-terceros-otros-bancos-recibo/transferencia-terceros-otros-bancos-recibo';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';
import { stringify } from '@angular/core/src/util';
import { TransferenciaTercerosBfcConfirmarPage } from '../transferencia-terceros-bfc-confirmar/transferencia-terceros-bfc-confirmar';

@Component({
  selector: 'page-transferencias-terceros-detalle',
  templateUrl: 'transferencias-terceros-detalle.html'
})
export class TransferenciasTercerosDetallePage {

  public checkFirstTime:boolean=true;
  public listvalores:any[]=[]; 
  public sortingListAccount:any[]=[]; 
  public sortingListDates:any[]=[]; 
  public listmeses:any[]=[]; 
  public cuentas:any[]=[];
  public tdc:any[]=[];
  public AF_CodCliente:string;
  public AF_Rif:string;
  public SNroCuenta:string;
  public posicionSelected:number;
  public cuentaDebito:string;
  public cuentaCredito:string;
  public cuentaDebitoFull:string;
  public cuentaCreditoFull:string;
  public email:string;
  public cedula:string;
  public ciNo:string;
  public ciType:string;
  public nombre:string;
  public montoValue:number;
  public sdisponible:string;
  public favoritoSelected:any[]=[];
  public motivo:string;
  public conceptoValue:string;

  constructor(public navCtrl: NavController,public userSession:UserSessionProvider, public formBuilder: FormBuilder, 
    private toastCtrl: ToastController, private alertCtrl: AlertController, public navParams: NavParams,
    public httpClient: HttpClient) {
      console.log(this.favoritoSelected);      
      this.userSession.reloadAccountData();
      this.cuentas = userSession.cuentas;
      this.tdc = userSession.tdc;
      this.favoritoSelected = navParams.get("favoritoSelected");
      this.cuentaCreditoFull = this.favoritoSelected[6];
      var NroCuentaMasked2:string = this.cuentaCreditoFull.substr(-4);
      var NroCuentaMasked1:string = this.cuentaCreditoFull.substr(0,4);
      this.cuentaCredito = NroCuentaMasked1+"************"+NroCuentaMasked2;
      this.email = this.favoritoSelected[5];
      this.cedula = this.favoritoSelected[3];
      this.ciNo = this.cedula.substr(1,12);
      this.ciType = this.cedula.substr(0,1);
      this.nombre = this.favoritoSelected[2];
      this.AF_CodCliente = userSession.AF_Codcliente;
      this.AF_Rif = userSession.AF_Rif; 
    }


  loadSaldo(item:any[]){
    this.cuentaDebitoFull = item[0]
    this.sdisponible=item[4];
  }

  loadMotivo1(){
    this.motivo = 'Pago de Préstamo';
  }
  loadMotivo2(){
    this.motivo = 'Ahorros';
  }
  loadMotivo3(){
    this.motivo = 'Otros';
  }

  changeValueCredit(value: any){
    this.cuentaCredito=value
  }

  changeValueDebit(value: any){
    this.cuentaDebito=value
  }

  goToTransferenciaTercerosOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosPage);
  }

  goToTransferenciaTercerosOtrosBancosRecibo(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosReciboPage);
  }

  goToTransferenciaTercerosBFCConfirmar(){
    console.log("sending: "+this.cuentaDebito+"-"+this.cuentaCredito
    +"-"+this.cuentaDebitoFull
    +"-"+this.cuentaCreditoFull
    +"-"+this.nombre
    +"-"+this.ciNo
    +"-"+this.ciType
    +"-"+this.montoValue
    +"-"+this.motivo
    +"-"+this.conceptoValue
    +"-"+this.email
    +"-"+this.sdisponible
    );
    this.navCtrl.push(TransferenciaTercerosBfcConfirmarPage,{
      "cuentaDebito":this.cuentaDebito,
      "cuentaCredito":this.cuentaCredito,
      "cuentaDebitoFull":this.cuentaDebitoFull,
      "cuentaCreditoFull":this.cuentaCreditoFull,
      "nombre":this.nombre,
      "ciNo":this.ciNo,
      "ciType":this.ciType,
      "montoValue":this.montoValue,
      "motivo":this.motivo,
      "conceptoValue":this.conceptoValue,
      "email":this.email,
      "sdisponible":this.sdisponible,
    });
  }
 /*   Cuenta Debito:
      Cuenta Crédito:
      Beneficiario:
      Cédula/Rif/Beneficiario:
      Monto a Transferir:
      Motivo:
      Concepto: 
      Correo:
  */

  goBack(){
    this.navCtrl.pop();
  }
}
