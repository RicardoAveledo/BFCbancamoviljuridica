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
import { TransferenciaMismoTitularOtrosBancosReciboPage } from '../transferencia-mismo-titular-otros-bancos-recibo/transferencia-mismo-titular-otros-bancos-recibo';
import { PagoTdcMismoTitularOtrosBancosReciboPage } from '../pago-tdc-mismo-titular-otros-bancos-recibo/pago-tdc-mismo-titular-otros-bancos-recibo';

/**
 * Generated class for the PagoTdcMismoTitularOtrosBancosConfirmarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PagoTdcMismoTitularOtrosBancosConfirmarPage',
  segment: 'PagoTdcMismoTitularOtrosBancosConfirmarPage'
})
@Component({
  selector: 'page-pago-tdc-mismo-titular-otros-bancos-confirmar',
  templateUrl: 'pago-tdc-mismo-titular-otros-bancos-confirmar.html',
})
export class PagoTdcMismoTitularOtrosBancosConfirmarPage {

 
  public cuentaDebito:string;
  public cuentaCredito:string;
  public cuentaDebitoFull:string;
  public cuentaCreditoFull:string;
  public nombre:string;
  public ciNo:string;
  public ciType:string;
  public email:string;
  public sdisponible:string;
  public conceptoValue:string;
  public montoValue:string;
  public motivo:string; 
  public confirmacion:boolean;
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
  public fecha:string;
  public fechaToSend:string;
  public referencia:string;
  public bankName:string;
  public bankCod:string;
  public checkFirmas:string;

  constructor(public navCtrl: NavController,public userSession:UserSessionProvider,
     public formBuilder: FormBuilder, private toastCtrl: ToastController, 
     private alertCtrl: AlertController, public navParams: NavParams,
     public httpClient: HttpClient) {
       this.cuentaDebito = navParams.get("cuentaDebito");
       this.cuentaCredito = navParams.get("cuentaCredito");
       this.cuentaDebitoFull = navParams.get("cuentaDebitoFull");
       this.cuentaCreditoFull = navParams.get("cuentaCreditoFull");
       this.bankName = navParams.get("bankName");
       this.bankCod = navParams.get("bankCod");
       this.nombre = navParams.get("nombre");
       this.ciNo = navParams.get("ciNo");
       this.ciType = navParams.get("ciType");
       this.email = navParams.get("email"); 
       this.sdisponible = navParams.get("sdisponible"); 
       this.conceptoValue = navParams.get("conceptoValue"); 
       this.montoValue = navParams.get("montoValue"); 
       this.motivo = navParams.get("motivo"); 
       this.fecha = navParams.get("fecha"); 
       console.log("receiving: "+this.cuentaDebito+"-"+this.cuentaCredito
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
                    +"-"+this.fecha
                    +"-"+this.bankName
       );
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
       this.day= new Date().getDate();
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
          text: 'confirmar',
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferenciaTercerosBfcConfirmarPage');
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
         <sCod>27</sCod>
         <sMonto>`+this.montoValue+`</sMonto>
         <bancoid>`+this.bankCod+`</bancoid>
         <banco>`+this.bankName+`</banco>
         <OP_Destino>`+this.cuentaCreditoFull+`</OP_Destino>
         <OP_Mail>`+this.email+`</OP_Mail>
         <OP_Beneficiario>`+this.nombre+`</OP_Beneficiario>
         <OP_IdBeneficiario>`+this.userSession.AF_Rif+`</OP_IdBeneficiario>
         <OP_Concepto>`+this.conceptoValue+`</OP_Concepto>
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
                        self.navCtrl.push('PagoTdcMismoTitularOtrosBancosReciboPage',{
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
                          "fechaToSend":self.fechaToSend,
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
      var listvalores:any[]=[];
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
      this.day= new Date().getDate();
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
      this.fechaToSend = this.day.toString()+"/"+this.month.toString()+"/"+this.year.toString();      try {
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
         <PagoTarjetaCreditoOtrosBancosMismoTitular xmlns="http://tempuri.org/">
           <CodCliente>`+this.userSession.AF_Codcliente+`</CodCliente>
           <Rif>`+this.userSession.AF_Rif+`</Rif>
           <Monto>`+this.montoValue+`</Monto>
           <CtaDebitar>`+this.cuentaDebitoFull+`</CtaDebitar>
           <CO_Nombres>`+this.userSession.CO_NOMBRES+`</CO_Nombres>
           <codtarjetaAcreditar>`+this.cuentaCreditoFull+`</codtarjetaAcreditar>
           <Beneficiario>`+this.nombre+`</Beneficiario>
           <Rif2>`+this.userSession.AF_Rif+`</Rif2>
           <CedulaBeneficiario>`+this.ciNo+`</CedulaBeneficiario>
           <SCodBco>`+this.bankCod+`</SCodBco>
           <Ip>10.60.102.133</Ip>
           <Motivo>`+this.motivo+`</Motivo>
           <TipoTarj></TipoTarj>
           <concepto></concepto>
           <AF_Id>`+this.userSession.AF_Id+`</AF_Id>
           <AF_NombreUsuario>`+this.userSession.AF_NombreUsuario+`</AF_NombreUsuario>
           <AfiliadoCO_Nombres>`+this.userSession.CO_NOMBRES+`</AfiliadoCO_Nombres>
         </PagoTarjetaCreditoOtrosBancosMismoTitular>
       </soap:Body>
     </soap:Envelope>`

     console.log("TRANSFERENCIAS MISMO TITULAR OTROS BANCOS SENDING THIS: ",postData);
     //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
    this.httpClient.post("http://"+this.userSession.serverIPApp+"/WsPagoTDCMovil.asmx?op=PagoTarjetaCreditoOtrosBancosMismoTitular",postData,httpOptions )
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
                         console.log("TDC hecha: ",search_array);
                         self.referencia = search_array.p['soap:Envelope']['0']['soap:Body']['0'].PagoTarjetaCreditoOtrosBancosMismoTitularResponse['0'].PagoTarjetaCreditoOtrosBancosMismoTitularResult['0'].inextdsjv['0'].SReferencia['0']
                         console.log("REF: ",self.referencia);
                         self.navCtrl.push('PagoTdcMismoTitularOtrosBancosReciboPage',{
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
                          "fechaToSend":self.fechaToSend,
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
  goBack(){
    this.navCtrl.pop();
  }


}
