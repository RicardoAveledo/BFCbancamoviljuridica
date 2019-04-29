import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { TransferenciaMismoTitularOtrosBancosReciboPage } from '../transferencia-mismo-titular-otros-bancos-recibo/transferencia-mismo-titular-otros-bancos-recibo';

@Component({
  selector: 'page-aprobaci-nrechazo',
  templateUrl: 'aprobaci-nrechazo.html'
})
export class AprobaciNRechazoPage {

  public item;
  public cuentaDebito:string;
  public cuentaCredito:string;
  public montoValue:number;
  public BANK_ID:string;            
  public BANK_NOMBRE:string;        
  public Cod:string;                
  public Es_Descripcion:string;     
  public Nombre:string;             
  public OP_Beneficiario:string;    
  public OP_CodClienteGrupo:string; 
  public OP_CodeTran:string;        
  public OP_Concepto:string;        
  public OP_DATA:string;            
  public OP_DATE:string;            
  public OP_Destino:string;         
  public OP_ID:string;              
  public OP_IdBeneficiario:string;  
  public OP_IdServicio:string;      
  public OP_Interface:string;       
  public OP_Mail:string;            
  public OP_Monto:string;           
  public OP_OlbId:string;          
  public OP_Origen:string;          
  public OP_RifGrupo:string;        
  public firmasFaltantes:string;        
  public cantidadFirmas:string;        
  public estado:string;     
  public fechaEfectiva:string;
  public horaEfectiva:string;   
  public FechaValor: string;  
  public HoraValor: string;  
  public NombreArchivo: string;  
  public EstadoLote: string;  
  public TotalRegistros: string;  
  public Monto: string;  
  public TipoCarga: string;  
  public MotivoPago: string;  
  public CuentaDebitar: string;  
  public correoUsuario:string;
  public usuarioProceso:string;
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

  constructor(public httpClient: HttpClient, private alertCtrl: AlertController, public userSession:UserSessionProvider, public navCtrl: NavController, public navParams: NavParams) {
      this.item = navParams.get('itemPassed');
      this.firmasFaltantes = navParams.get('firmasFaltantes');
      this.cantidadFirmas = navParams.get('cantidadFirmas');
      if(this.cantidadFirmas == "3"){
        if(this.firmasFaltantes=="0"){
            this.estado = "3/3"
        } else if(this.firmasFaltantes=="1"){
          this.estado = "3/2"
        } else if(this.firmasFaltantes=="2"){
          this.estado = "3/1"
        } else if(this.firmasFaltantes=="3"){
          this.estado = "3/0"
        } 
      } else if(this.cantidadFirmas == "2"){
        if(this.firmasFaltantes=="0"){
            this.estado = "2/2"
        } else if(this.firmasFaltantes=="1"){
          this.estado = "2/1"
        } else if(this.firmasFaltantes=="2"){
          this.estado = "2/0"
        }
      } else if(this.cantidadFirmas == "1"){
        if(this.firmasFaltantes=="0"){
            this.estado = "1/1"
        } else if(this.firmasFaltantes=="1"){
          this.estado = "1/0"
        }
      } 
      console.log("Trae esto: ", this.item);
      this.cuentaCredito      = this.item.OP_Destino         ;
      this.cuentaDebito       = this.item.OP_Origen          ;
      this.montoValue         = this.item.OP_Monto           ;
      this.BANK_ID            = this.item.BANK_ID            ;                
      this.BANK_NOMBRE        = this.item.BANK_NOMBRE        ;
      //Cod trae el código de operación, con esto mostramos las opciones en la vista.                  
      this.Cod                = this.item.Cod                ;                           
      this.Es_Descripcion     = this.item.Es_Descripcion     ;
      this.Nombre             = this.item.Nombre             ;
      this.OP_Beneficiario    = this.item.OP_Beneficiario    ;
      this.OP_CodClienteGrupo = this.item.OP_CodClienteGrupo ; 
      this.OP_Concepto        = this.item.OP_Concepto        ;
      this.OP_DATA            = this.item.OP_DATA            ;
      this.OP_DATE            = this.item.OP_DATE            ;    
      this.OP_Destino         = this.item.OP_Destino         ;                      
      this.OP_ID              = this.item.OP_ID              ;                    
      this.OP_IdBeneficiario  = this.item.OP_IdBeneficiario  ;                          
      this.OP_IdServicio      = this.item.OP_IdServicio      ;                            
      this.OP_Interface       = this.item.OP_Interface       ;                        
      this.OP_Mail            = this.item.OP_Mail            ;                  
      this.OP_Monto           = this.item.OP_Monto           ;                    
      this.OP_OlbId           = this.item.OP_OlbId           ;                      
      this.OP_Origen          = this.item.OP_Origen          ;                      
      this.OP_RifGrupo        = this.item.OP_RifGrupo        ;  
      this.OP_CodeTran        = navParams.get('OP_CodeTran');              
      this.fechaEfectiva      = navParams.get('FechaValor');             
      this.horaEfectiva       = navParams.get('HoraValor');            
      this.NombreArchivo      = navParams.get('NombreArchivo');                
      this.EstadoLote         = navParams.get('EstadoLote');             
      this.TotalRegistros     = navParams.get('TotalRegistros');                 
      this.Monto              = navParams.get('Monto');        
      this.TipoCarga          = navParams.get('TipoCarga');            
      this.MotivoPago         = navParams.get('MotivoPago');      
      this.CuentaDebitar      = navParams.get('CuentaDebitar');  
      this.usuarioProceso = this.userSession.CO_NOMBRES;
      this.correoUsuario = this.userSession.CO_Email;
      console.log("Recibo esto en Detalle: ", this.OP_CodeTran    +" " + this.FechaValor     +" " + this.HoraValor      +" " + this.NombreArchivo  +" " + this.EstadoLote     +" " + this.TotalRegistros +" " + this.Monto          +" " + this.TipoCarga      +" " + this.MotivoPago     +" " + this.CuentaDebitar  )

      console.log("Monto:",this.montoValue);         
  }

  goBack(){
    this.navCtrl.pop();
  }

  confirm(){
    let alert = this.alertCtrl.create({
      title: 'BFC',
      message: '¿Desea confirmar la transacción?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.checkFirmas();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  reject(){
    let alert = this.alertCtrl.create({
      title: 'BFC',
      message: '¿Desea rechazar la transacción?',
      buttons: [
        {
          text: 'Si',
          handler: () => {

          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  checkFirmas(){
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
       <FirmasUpdate xmlns="http://tempuri.org/">
         <OP_Id>`+this.OP_ID+`</OP_Id>
         <Id>`+this.userSession.AF_Id+`</Id>
       </FirmasUpdate>
     </soap:Body>
   </soap:Envelope>`

   console.log(postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.userSession.httpClient.post("http://"+this.userSession.serverIPApp+"/WsMovil.asmx?op=FirmasUpdate",postData,httpOptions )
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
                      console.log("Número de firmas: ", search_array);
                      var count:string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].FirmasUpdateResponse['0'].FirmasUpdateResult['0'];
                      if(count == "0"){
                        if(self.Cod=="19"){
                         self.makeTheTransferMTOB();
                        } 
                        //Acá hacer todos los IF con todos los makeTheTransfer a cada transaccion
                      } else {
                        if(self.Cod=="19"){
                          self.navCtrl.push(TransferenciaMismoTitularOtrosBancosReciboPage,{
                            "cuentaDebito":self.cuentaDebito,
                            "cuentaCredito":self.cuentaCredito,
                            "cuentaDebitoFull":self.cuentaDebito,
                            "cuentaCreditoFull":self.cuentaCredito,
                            "nombre":self.Nombre,
                            "ciNo":self.OP_IdBeneficiario,
                            "ciType":"",
                            "montoValue":self.montoValue,
                            "motivo":self.MotivoPago,
                            "conceptoValue":self.OP_Concepto,
                            "email":self.OP_Mail,
                            "bankName":self.BANK_NOMBRE,
                            "fechaToSend":self.fechaToSend,
                            "referencia":self.referencia,
                            "checkFirmas":"false",
                          });
                        } 
                        //Acá hacer todos los IF con todos los push a cada transaccion
                      }
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

  makeTheTransferMTOB(){
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
       <TransferenciaOtrosBancosMismoTitular xmlns="http://tempuri.org/">
         <CodCliente>`+this.userSession.AF_Codcliente+`</CodCliente>
         <Rif>`+this.userSession.AF_Rif+`</Rif>
         <date>`+this.yearStr+`-`+this.monthStr+`-`+this.dayStr+`T`+this.hoursStr+`:`+this.minutesStr+`:00.000-00:00</date>
         <montoIbs>`+this.montoValue+`</montoIbs>
         <CtaDebitar>`+this.cuentaDebito+`</CtaDebitar>
         <AfiliadoCO_Nombres>`+this.userSession.CO_NOMBRES+`</AfiliadoCO_Nombres>
         <CtaAcreditar>`+this.cuentaCredito+`</CtaAcreditar>
         <Beneficiario>`+this.Nombre+`</Beneficiario>
         <Rif2>`+this.userSession.AF_Rif+`</Rif2>
         <CedulaBeneficiario>`+this.OP_IdBeneficiario+`</CedulaBeneficiario>
         <codigo220>220</codigo220>
         <SCodBco>`+this.BANK_ID+`</SCodBco>
         <Ip>10.60.102.133</Ip>
         <Motivo>`+this.OP_Concepto+`</Motivo>
       </TransferenciaOtrosBancosMismoTitular>
     </soap:Body>
   </soap:Envelope>`

   console.log("TRANSFERENCIAS MISMO TITULAR OTROS BANCOS SENDING THIS: ",postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
  this.httpClient.post("http://"+this.userSession.serverIPApp+"/WsTransferenciasMovil.asmx?op=TransferenciaOtrosBancosMismoTitular",postData,httpOptions )
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
                       console.log("Transferencia hecha: ",search_array);
                       self.referencia = search_array.p['soap:Envelope']['0']['soap:Body']['0'].TransferenciaOtrosBancosMismoTitularResponse['0'].TransferenciaOtrosBancosMismoTitularResult['0'].inextdsjv['0'].SReferencia['0'];
                       console.log("REF: ",self.referencia);
                       self.navCtrl.push(TransferenciaMismoTitularOtrosBancosReciboPage,{
                        "cuentaDebito":self.cuentaDebito,
                        "cuentaCredito":self.cuentaCredito,
                        "cuentaDebitoFull":self.cuentaDebito,
                        "cuentaCreditoFull":self.cuentaCredito,
                        "nombre":self.Nombre,
                        "ciNo":self.OP_IdBeneficiario,
                        "ciType":"",
                        "montoValue":self.montoValue,
                        "motivo":self.MotivoPago,
                        "conceptoValue":self.OP_Concepto,
                        "email":self.OP_Mail,
                        "bankName":self.BANK_NOMBRE,
                        "fechaToSend":self.fechaToSend,
                        "referencia":self.referencia,
                        "checkFirmas":"true",
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AprobacionRechazoConsultaDetallePage');
  }

}
