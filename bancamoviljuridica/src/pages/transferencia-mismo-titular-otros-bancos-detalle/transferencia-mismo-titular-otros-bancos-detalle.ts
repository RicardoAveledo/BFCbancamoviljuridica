import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';
import { stringify } from '@angular/core/src/util';
import { TransferenciaMismoTitularOtrosBancosConfirmarPage } from '../transferencia-mismo-titular-otros-bancos-confirmar/transferencia-mismo-titular-otros-bancos-confirmar';

/**
 * Generated class for the TransferenciaMismoTitularOtrosBancosDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transferencia-mismo-titular-otros-bancos-detalle',
  templateUrl: 'transferencia-mismo-titular-otros-bancos-detalle.html',
})
export class TransferenciaMismoTitularOtrosBancosDetallePage {

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
  public fecha:string;
  public conceptoValue:string;
  public bankName:string;
  public bankCod:string;

  constructor(public navCtrl: NavController,public userSession:UserSessionProvider, public formBuilder: FormBuilder, 
    private toastCtrl: ToastController, private alertCtrl: AlertController, public navParams: NavParams,
    public httpClient: HttpClient) {
      console.log(this.favoritoSelected);      
      this.userSession.reloadAccountData();
      this.cuentas = userSession.cuentas;
      this.tdc = userSession.tdc;
      this.favoritoSelected = navParams.get("favoritoSelected");
      this.bankName = navParams.get("bankName");
      this.bankCod = navParams.get("bankCod");
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferenciaMismoTitularOtrosBancosDetallePage');
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
    +"-"+this.bankName
    +"-"+this.bankCod
    );
    /*if (+this.sdisponible<+this.montoValue){
        this.showAlert('La cuenta seleccionada no dispone de saldo suficiente');
        console.log(this.sdisponible+" < "+this.montoValue+ " - " + (+this.sdisponible<+this.montoValue))
      } else if (this.cuentaDebito==undefined){
        this.showAlert('Seleccione la cuenta a Debitar');
      } else if (this.cuentaCredito==undefined){
        this.showAlert('Seleccione la cuenta a Acreditar');
      } else if (this.nombre==""){
        this.showAlert('No se encuentra el nombre del beneficiario');
      } else if (this.ciNo==""){
        this.showAlert('Escriba el número de cédula o Rif');
      } else if (this.montoValue==0){
        this.showAlert('Escriba un monto superior a 0');
      } else {*/
        this.navCtrl.push(TransferenciaMismoTitularOtrosBancosConfirmarPage,{
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
          "bankName":this.bankName,
          "bankCod":this.bankCod,
        });
      //}
    
  }

  showAlert(mensaje: string) {
    const alert = this.alertCtrl.create({
      title: 'BFC',
      subTitle: mensaje ,
      buttons: ['OK']
    });
    alert.present();
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
