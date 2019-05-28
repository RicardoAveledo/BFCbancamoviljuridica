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
import { PagoTdcMismoTitularOtrosBancosConfirmarPage } from '../pago-tdc-mismo-titular-otros-bancos-confirmar/pago-tdc-mismo-titular-otros-bancos-confirmar';

/**
 * Generated class for the PagoTdcMismoTitularOtrosBancosDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PagoTdcMismoTitularOtrosBancosDetallePage',
  segment: 'PagoTdcMismoTitularOtrosBancosDetallePage'
})
@Component({
  selector: 'page-pago-tdc-mismo-titular-otros-bancos-detalle',
  templateUrl: 'pago-tdc-mismo-titular-otros-bancos-detalle.html',
})
export class PagoTdcMismoTitularOtrosBancosDetallePage {

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

  goToTDCTercerosOtrosBancos(){
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
        if (+this.sdisponible<+this.montoValue){
          this.showAlert('La cuenta seleccionada no dispone de saldo suficiente');
          console.log(this.sdisponible+" < "+this.montoValue+ " - " + (+this.sdisponible<+this.montoValue))
        }else 
        if(this.montoValue==null){
          this.showAlert('El monto no puede ser cero');
        } else {
          if(this.cuentaCreditoFull==this.cuentaDebitoFull){
            this.showAlert('No puede transferir a la misma cuenta');
          } else {
            var listvalores:any[]=[];
            try {
              //Ahora se procede a traer el menú dinámico:
             var headers = new HttpHeaders();
             headers.append('Content-Type', 'text/xml');
             var httpOptions = {
                 headers: new HttpHeaders({
                   'Content-Type':  'text/xml'
               })
             };
        
             //Se hace la solicitud HTTP Para traer el menú con las opciones según el usuario que acaba de iniciar sesión
             //Traeremos el id, de la ráfaga anterior (La respuesta, del login)
             var postData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
             <soap:Body>
               <ModelosGet xmlns="http://tempuri.org/">
                 <AF_Id>`+this.userSession.AF_IdPrincipal+`</AF_Id>
                 <Cod>27</Cod>
                 <CTA_ID>`+this.cuentaDebitoFull+`</CTA_ID>
               </ModelosGet>
             </soap:Body>
           </soap:Envelope>`
        
           console.log(postData);
           //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
              this.httpClient.post("http://"+this.userSession.serverIPWS+"/WsModelos.asmx?op=ModelosGet",postData,httpOptions )
             .subscribe(data => {
              // console.log('Data: '+data['_body']); 
              }, error => {
                     //Hacemos el parse tal cual como antes:
                     console.log('Error: '+JSON.stringify(error));
                     var str = JSON.stringify(error);
                     console.log("stingified: ", str);
                     var search_array = JSON.parse(str);
                     console.log("result: ", search_array.error.text);
                     var parser = new DOMParser();
                     var doc = parser.parseFromString(search_array.error.text, "application/xml");
                     console.log(doc);
                     var el = doc.createElement("p");
                     el.appendChild(doc.getElementsByTagName("soap:Envelope").item(0));
                     var tmp = doc.createElement("div");
                     tmp.appendChild(el);
                     console.log(tmp.innerHTML);
                     var parseString = xml2js.parseString;
                     var xml = tmp.innerHTML;
                    // var texto:string = "";
                     var self = this;
                     parseString(xml, self, function (err, result) {
                         try{
                                  console.dir(result);
                                  var str = JSON.stringify(result);
                                  console.log("stringified: ", result);
                                  var search_array = JSON.parse(str);
                                  console.log("MODELO: ", search_array);
                                  var montoMax:string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ModelosGetResponse['0'].ModelosGetResult['0'].Modelo['0'].CT_MontoMax['0'];
                                  if(+montoMax >= +self.montoValue){
                                    self.navCtrl.push('PagoTdcMismoTitularOtrosBancosConfirmarPage',{
                                      "cuentaDebito":self.cuentaDebito,
                                      "cuentaCredito":self.cuentaCredito,
                                      "cuentaDebitoFull":self.cuentaDebitoFull,
                                      "cuentaCreditoFull":self.cuentaCreditoFull,
                                      "nombre":self.nombre,
                                      "ciNo":self.ciNo,
                                      "ciType":self.ciType,
                                      "montoValue":self.montoValue,
                                      "motivo":self.motivo,
                                      "conceptoValue":self.conceptoValue,
                                      "email":self.email,
                                      "sdisponible":self.sdisponible,
                                      "bankName":self.bankName,
                                      "bankCod":self.bankCod,
                                    });
                                  }else{
                                    self.showAlert('El modelo no permite un monto tan alto.');
                                  }
                                  console.log(self.sdisponible+" < "+self.montoValue+ " - " + (+self.sdisponible<+self.montoValue))
                                  
                           }catch(Error){
                            console.log("Error try 1")
                            self.showAlert('Transacción no cumple con los criterios del modelo definido');
                            //self.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                            //self.presentToast();
                           }
                         });
              });
            } catch (error) {
              console.log("Error try 2")
            }
  
            
          }
  }
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
