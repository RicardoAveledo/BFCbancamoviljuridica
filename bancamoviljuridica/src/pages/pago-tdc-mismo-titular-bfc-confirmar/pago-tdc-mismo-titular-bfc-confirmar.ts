import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, DateTime } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { ToastController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { PagoTdcMismoTitularBfcReciboPage } from '../pago-tdc-mismo-titular-bfc-recibo/pago-tdc-mismo-titular-bfc-recibo';
/**
 * Generated class for the PagoTdcMismoTitularBfcConfirmarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'PagoTdcMismoTitularBfcConfirmarPage',
  segment: 'PagoTdcMismoTitularBfcConfirmarPage'
})
@Component({
  selector: 'page-pago-tdc-mismo-titular-bfc-confirmar',
  templateUrl: 'pago-tdc-mismo-titular-bfc-confirmar.html',
})
export class PagoTdcMismoTitularBfcConfirmarPage {

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
  public noCuenta:string;

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagoTdcMismoTitularBfcConfirmarPage');
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

  goToTDCMismoTitularBFCRecibo(params){

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
         <sCod>24</sCod>
         <sMonto>`+this.montoValue+`</sMonto>
         <bancoid></bancoid>
         <banco></banco>
         <OP_Destino>`+this.cuentaCreditoFull+`</OP_Destino>
         <OP_Mail></OP_Mail>
         <OP_Beneficiario></OP_Beneficiario>
         <OP_IdBeneficiario></OP_IdBeneficiario>
         <OP_Concepto></OP_Concepto>
         <OP_CodeTran>0</OP_CodeTran>
         <OP_IdServicio>0</OP_IdServicio>
         <OP_OlbId>0</OP_OlbId>
         <OP_DATA></OP_DATA>
         <AF_NroGrupo>0</AF_NroGrupo>
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
                        self.navCtrl.push('PagoTdcMismoTitularBfcReciboPage',{
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

     
     if (this.cuentaCreditoFull.substr(0,1)=="4"){
      this.noCuenta = "4630000019";
     }else if (this.cuentaCreditoFull.substr(0,1)=="5"){
      this.noCuenta = "4630000175";
     }

     //Se hace la solicitud HTTP Para traer el menú con las opciones según el usuario que acaba de iniciar sesión
     //Traeremos el id, de la ráfaga anterior (La respuesta, del login)
     var postData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
     <soap:Body>
       <PagoTarjetaCreditoMismoTitularBFC xmlns="http://tempuri.org/">
         <CodCliente>`+this.userSession.AF_Codcliente+`</CodCliente>
         <Rif>`+this.userSession.AF_Rif+`</Rif>
         <CtaDebitar>`+this.cuentaDebitoFull+`</CtaDebitar>
         <Rif_Afi>`+this.userSession.AF_Rif+`</Rif_Afi>
         <CtaAcreditar>`+this.noCuenta+`</CtaAcreditar>
         <Monto>`+this.montoValue+`</Monto>
         <Instrumento>`+this.cuentaCreditoFull+`</Instrumento>
         <Ip>10.40.102.40</Ip>
         <Motivo></Motivo>
         <TipoTarj></TipoTarj>
         <concepto></concepto>
         <AF_Id>`+this.userSession.AF_Id+`</AF_Id>
         <AfiliadoCO_Nombres>`+this.userSession.CO_NOMBRES+`</AfiliadoCO_Nombres>
         <AF_NombreUsuario>`+this.userSession.AF_NombreUsuario+`</AF_NombreUsuario>
      </PagoTarjetaCreditoMismoTitularBFC>
     </soap:Body>
   </soap:Envelope>`
   
   console.log(postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://"+this.userSession.serverIPApp+"/WsPagoTDCMovil.asmx?op=PagoTarjetaCreditoMismoTitularBFC",postData,httpOptions )
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
                      console.log("PAGO HECHO: ",search_array);
                      self.referencia = search_array.p['soap:Envelope']['0']['soap:Body']['0'].PagoTarjetaCreditoMismoTitularBFCResponse['0'].PagoTarjetaCreditoMismoTitularBFCResult['0'].intrfdsjv['0'].SCodAutoriza['0']
                      console.log("REF: ",self.referencia);
                      ////search_array.
                      self.navCtrl.push('PagoTdcMismoTitularBfcReciboPage',{
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
}
