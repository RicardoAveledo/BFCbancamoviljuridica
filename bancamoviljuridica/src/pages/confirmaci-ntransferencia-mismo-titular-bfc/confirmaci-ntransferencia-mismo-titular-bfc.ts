import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, DateTime } from 'ionic-angular';
import { TransferenciaMismoTitularBFCReciboPage } from '../transferencia-mismo-titular-bfcrecibo/transferencia-mismo-titular-bfcrecibo';
import { PosiciNConsolidadaPage } from '../posici-nconsolidada/posici-nconsolidada';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { TransferenciasPage } from '../transferencias/transferencias';
import { TransferenciasMismoTitularBFCPage } from '../transferencias-mismo-titular-bfc/transferencias-mismo-titular-bfc';
import { TransferenciaMismoTitularOtrosBancosPage } from '../transferencia-mismo-titular-otros-bancos/transferencia-mismo-titular-otros-bancos';
import { TransferenciaTercerosBFCPage } from '../transferencia-terceros-bfc/transferencia-terceros-bfc';
import { TransferenciasTercerosDetallePage } from '../transferencias-terceros-detalle/transferencias-terceros-detalle';
import { TransferenciaTercerosOtrosBancosPage } from '../transferencia-terceros-otros-bancos/transferencia-terceros-otros-bancos';
import { TransferenciaTercerosOtrosBancosReciboPage } from '../transferencia-terceros-otros-bancos-recibo/transferencia-terceros-otros-bancos-recibo';
import { AlertController } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { ToastController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';

@Component({
  selector: 'page-confirmaci-ntransferencia-mismo-titular-bfc',
  templateUrl: 'confirmaci-ntransferencia-mismo-titular-bfc.html'
})
export class ConfirmaciNTransferenciaMismoTitularBFCPage {
  public cuentaDebito:string;
  public cuentaCredito:string;
  public cuentaDebitoFull:string;
  public cuentaCreditoFull:string;
  montoValue:number;
  public fecha:string;
  public fechaToSend:string;
  confirmacion:boolean;
  public hours:number;
  public minutes:number;
  public day:number;
  public month:number;
  public year:number;
  public hoursStr:string;
  public minutesStr:string;
  public dayStr:string;
  public monthStr:string;
  public yearStr:string;
  public yearprint:string;
  public referencia:string;
  public checkFirmas:string;
  
  constructor(public navCtrl: NavController, public httpClient: HttpClient, private viewCtrl: ViewController,
     public navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController,
     public userSession:UserSessionProvider) {
    this.cuentaDebito = navParams.get('cuentaDebito');
    this.cuentaCredito = navParams.get('cuentaCredito');
    this.cuentaDebitoFull = navParams.get('cuentaDebitoFull');
    this.cuentaCreditoFull = navParams.get('cuentaCreditoFull');
    this.montoValue = navParams.get('montoValue');
    this.hours= new Date().getHours();
    if (this.hours<10){
      this.hoursStr =  "0"+this.hours;
    } else {
      this.hoursStr =  ""+this.hours;
    }
    this.minutes= new Date().getMinutes();
    if (this.minutes<10){
      this.minutesStr =  "0"+this.minutes;
    } else {
      this.minutesStr =  ""+this.minutes;
    }
    this.day= new Date().getDay();
    if (this.day<10){
      this.dayStr =  "0"+this.day;
    } else {
      this.dayStr =  ""+this.day;
    }
    this.month = new Date().getMonth()+1; 
    if (this.month<10){
      this.monthStr =  "0"+this.month;
    } else {
      this.monthStr =  ""+this.month;
    }
    this.year = new Date().getFullYear();
    if (this.year<10){
      this.yearStr =  "0"+this.year;
    } else {
      this.yearStr =  ""+this.year;
    }
    this.yearprint = this.year.toString().substr(-2);
    this.fecha = this.day.toString()+"/"+this.month.toString()+"/"+this.yearprint;
    this.fechaToSend = this.day.toString()+"/"+this.month.toString()+"/"+this.year.toString();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.confirmacion = false;
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.confirmacion = true;
            this.validarModel();

            console.log('Comfirmar clicked');
          }
        }
      ]
    });
    alert.present();
  }

  changeValueCredit(value: any)
  {
    this.cuentaCredito=value
  }

  changeValueDebit(value: any)
  {
    this.cuentaDebito=value
  }



  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  goToTransferenciaMismoTitularBFCRecibo(params){

    this.presentConfirm();
    if (this.confirmacion==true)
    {
      if (!params) params = {}; 
    }

  }

  validarModel(){
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
       <ValidarModel xmlns="http://tempuri.org/">
         <AF_Id>`+this.userSession.AF_Id+`</AF_Id>
         <AF_RIF>`+this.userSession.AF_Rif+`</AF_RIF>
         <AF_CTA>`+this.cuentaDebitoFull+`</AF_CTA>
         <sCod>16</sCod>
         <sMonto>`+this.montoValue+`</sMonto>
         <bancoid></bancoid>
         <banco></banco>
         <OP_Destino>`+this.cuentaCreditoFull+`</OP_Destino>
         <OP_Mail></OP_Mail>
         <OP_Beneficiario></OP_Beneficiario>
         <OP_IdBeneficiario>`+this.userSession.AF_Rif+`</OP_IdBeneficiario>
         <OP_Concepto></OP_Concepto>
         <OP_CodeTran>0</OP_CodeTran>
         <OP_IdServicio>0</OP_IdServicio>
         <OP_OlbId>0</OP_OlbId>
         <OP_DATA></OP_DATA>
         <AF_NroGrupo></AF_NroGrupo>
         <codCliente>`+this.userSession.AF_Codcliente+`</codCliente>
         <rifGrupo>`+this.userSession.AF_Rif+`</rifGrupo>
       </ValidarModel>
     </soap:Body>
   </soap:Envelope>`

   console.log(postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://"+this.userSession.serverIPApp+"/WsTransferenciasMovil.asmx?op=ValidarModel",postData,httpOptions )
     .subscribe(data => {
      // console.log('Data: '+data['_body']); 
      }, error => {
        try{
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
                       console.log("VALIDAR MODELO: ", search_array);
                       self.checkFirmas = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ValidarModelResponse['0'].ValidarModelResult['0']
                       console.log("CHECKFIRMA: ",self.checkFirmas);

                       //Si no devuelve 'false' con firmas, si no que explota con sql, entonces
                       //pongo lo que está dentro del else en el catch 
                       if(self.checkFirmas=='true'){
                          self.makeTheTransfer();
                       } else {
                        self.navCtrl.push(TransferenciaMismoTitularBFCReciboPage,{
                          "cuentaDebito":self.cuentaDebito,
                          "cuentaCredito":self.cuentaCredito,
                          "montoValue":self.montoValue,
                          "fecha":self.fecha,
                          "referencia":self.referencia,
                          "checkFirmas":self.checkFirmas,
                        });
                       }




                       
                   }catch(Error){
                    console.log("Error try 1")
                    //self.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                    //self.presentToast();
                   }
                 });
                 
                 
        }catch(Error){
          this.showAlert("No posee la cantidad de firmas requeridas para este modelo");
        }
      });
    } catch (error) {
      console.log("Error try 2")
    }
  }



  makeTheTransfer(){
    console.log("Esto esta en usersession.cuentos",this.cuentaCredito+" - "+this.cuentaDebito);
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
       <TransferenciaBFCMismoTitular xmlns="http://tempuri.org/">
         <CodCliente>`+this.userSession.AF_Codcliente+`</CodCliente>
         <Rif>`+this.userSession.AF_Rif+`</Rif>
         <CtaDebitar>`+this.cuentaDebitoFull+`</CtaDebitar>
         <CedulaBeneficiario>`+this.userSession.AF_Cedula+`</CedulaBeneficiario>
         <CtaAcreditar>`+this.cuentaCreditoFull+`</CtaAcreditar>
         <montoIBs>`+this.montoValue+`</montoIBs>
         <date>`+this.yearStr+`-`+this.monthStr+`-`+this.dayStr+`T`+this.hoursStr+`:`+this.minutesStr+`:00.000-00:00</date>
         <montoIbs>`+this.montoValue+`</montoIbs>
         <Ip>100.60.102.133</Ip>
         <Motivo></Motivo>
       </TransferenciaBFCMismoTitular>
     </soap:Body>
   </soap:Envelope>`
   
   console.log(postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://"+this.userSession.serverIPApp+"/WsTransferenciasMovil.asmx?op=TransferenciaBFCMismoTitular",postData,httpOptions )
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
                      console.log("TRANSFERENCIA HECHA: ",search_array);
                      self.referencia = search_array.p['soap:Envelope']['0']['soap:Body']['0'].TransferenciaBFCMismoTitularResponse['0'].TransferenciaBFCMismoTitularResult['0'].intrfdsjv['0'].SReferencia['0']
                      console.log("REF: ",self.referencia);
                      //search_array.
                      self.navCtrl.push(TransferenciaMismoTitularBFCReciboPage,{
                        "cuentaDebito":self.cuentaDebito,
                        "cuentaCredito":self.cuentaCredito,
                        "montoValue":self.montoValue,
                        "fecha":self.fecha,
                        "referencia":self.referencia,
                        "checkFirmas":self.checkFirmas,
                      });

                  }catch(Error){
                    console.log("Error try 1")
                    //self.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                    //self.presentToast();
                   }
                 });
      });
    } catch (error) {
      console.log("Error try 2")
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

  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }

  goToTransferenciasMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciasMismoTitularBFCPage);
  }
  goToPosiciNConsolidada(params){
    if (!params) params = {};
    this.navCtrl.push(PosiciNConsolidadaPage);
  }goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeLaCuentaPage);
  }goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeTarjetaPage);
  }goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciasPage);
  }goToConfirmaciNTransferenciaMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.push(ConfirmaciNTransferenciaMismoTitularBFCPage);
  }goToTransferenciaMismoTitularOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaMismoTitularOtrosBancosPage);
  }goToTransferenciaTercerosBFC(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosBFCPage);
  }goToTransferenciasTercerosDetalle(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciasTercerosDetallePage);
  }goToTransferenciaTercerosOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosPage);
  }goToTransferenciaTercerosOtrosBancosRecibo(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosReciboPage);
  }
}
