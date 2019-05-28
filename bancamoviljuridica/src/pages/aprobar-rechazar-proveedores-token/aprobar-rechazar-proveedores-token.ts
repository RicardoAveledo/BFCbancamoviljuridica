import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import xml2js from 'xml2js';
import { AprobarRechazarProveedoresReciboPage } from '../aprobar-rechazar-proveedores-recibo/aprobar-rechazar-proveedores-recibo';

/**
 * Generated class for the AprobarRechazarProveedoresTokenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'AprobarRechazarProveedoresTokenPage',
  segment: 'AprobarRechazarProveedoresTokenPage'
})
@Component({
  selector: 'page-aprobar-rechazar-proveedores-token',
  templateUrl: 'aprobar-rechazar-proveedores-token.html',
})
export class AprobarRechazarProveedoresTokenPage {

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
  public noCuenta:string;
  public CodigoOTP:string;
  public CodigoOTPCheck:string;

  constructor(public httpClient: HttpClient, private alertCtrl: AlertController, public userSession:UserSessionProvider, public navCtrl: NavController, public navParams: NavParams) {
      this.EstadoLote = navParams.get("EstadoLote");
      this.OP_CodeTran = navParams.get("OP_CodeTran");
      this.OP_ID = navParams.get("OP_ID");
      this.NombreArchivo = navParams.get("NombreArchivo");
      this.TipoCarga = navParams.get("TipoCarga");
      this.usuarioProceso = navParams.get("usuarioProceso");
      this.correoUsuario = navParams.get("correoUsuario");
      this.CuentaDebitar = navParams.get("CuentaDebitar");
      this.TotalRegistros = navParams.get("TotalRegistros");
      this.Monto = navParams.get("Monto");
      this.MotivoPago = navParams.get("MotivoPago");
      this.fechaEfectiva = navParams.get("fechaEfectiva");
      this.horaEfectiva = navParams.get("horaEfectiva");
      this.estado = navParams.get("estado");
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
         <CodigoOtp xmlns="http://tempuri.org/" />
       </soap:Body>
     </soap:Envelope>`
  
     console.log(postData);
     //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
        this.httpClient.post("http://"+userSession.serverIPApp+"/WsMovil.asmx?op=CodigoOtp",postData,httpOptions )
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
                         console.log("OTP",search_array);
                         self.CodigoOTP = search_array.p['soap:Envelope']['0']['soap:Body']['0'].CodigoOtpResponse['0'].CodigoOtpResult['0'];
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

  goBack(){
    this.navCtrl.pop();
  }

  showAlert(mensaje: string) {
    const alert = this.alertCtrl.create({
      title: 'BFC',
      subTitle: mensaje ,
      buttons: ['OK']
    });
    alert.present();
  }

  confirm(){
    let alert = this.alertCtrl.create({
      title: 'BFC',
      message: '¿Desea confirmar la transacción?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            if(this.CodigoOTP == this.CodigoOTPCheck){
              this.checkFirmas();
            } else {
              this.showAlert("Código OTP incorrecto")
            }
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
            if(this.CodigoOTP == this.CodigoOTPCheck){
              this.rechazarTransaccion();
            } else {
              this.showAlert("Código OTP incorrecto")
            }
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

  rechazarTransaccion(){
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
       <FirmasRechazar xmlns="http://tempuri.org/">
         <OP_Id>`+this.OP_ID+`</OP_Id>
         <Id>`+this.userSession.AF_Id+`</Id>
       </FirmasRechazar>
     </soap:Body>
   </soap:Envelope>`

   console.log(postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.userSession.httpClient.post("http://"+this.userSession.serverIPApp+"/WsMovil.asmx?op=FirmasRechazar",postData,httpOptions )
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
                      console.log("Operacion Rechazada: ", search_array);
                      var checkOP:string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].FirmasRechazarResponse['0'].FirmasRechazarResult['0'];
                      if (checkOP == '1060'){
                          self.showAlert("A ocurrido un error, intente más tarde");
                      } else {
                        self.navCtrl.push('AprobarRechazarProveedoresReciboPage',{
                          "EstadoLote":self.EstadoLote,
                          "OP_CodeTran":self.OP_CodeTran,
                          "OP_ID":self.OP_ID,
                          "NombreArchivo":self.NombreArchivo,
                          "TipoCarga":self.TipoCarga,
                          "usuarioProceso":self.usuarioProceso,
                          "correoUsuario":self.correoUsuario,
                          "CuentaDebitar":self.CuentaDebitar,
                          "TotalRegistros":self.TotalRegistros,
                          "Monto":self.Monto,
                          "MotivoPago":self.MotivoPago,
                          "fechaEfectiva":self.fechaEfectiva,
                          "horaEfectiva":self.horaEfectiva,
                          "estado":self.estado,
                          "checkFirmas":'rechazada',
                         })
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
                        self.makePayment();
                        //Acá hacer todos los IF con todos los makeTheTransfer a cada transaccion
                      } else if (count == "1060"){
                        self.showAlert("A ocurrido un error, intente más tarde");
                      } else {
                        self.navCtrl.push('AprobarRechazarProveedoresReciboPage',{
                          "EstadoLote":self.EstadoLote,
                          "OP_CodeTran":self.OP_CodeTran,
                          "OP_ID":self.OP_ID,
                          "NombreArchivo":self.NombreArchivo,
                          "TipoCarga":self.TipoCarga,
                          "usuarioProceso":self.usuarioProceso,
                          "correoUsuario":self.correoUsuario,
                          "CuentaDebitar":self.CuentaDebitar,
                          "TotalRegistros":self.TotalRegistros,
                          "Monto":self.Monto,
                          "MotivoPago":self.MotivoPago,
                          "fechaEfectiva":self.fechaEfectiva,
                          "horaEfectiva":self.horaEfectiva,
                          "estado":self.estado,
                          "checkFirmas":'false',
                         })
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

  makePayment(){
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
         <RealizarPagoProveedores xmlns="http://tempuri.org/">
           <rif>`+this.userSession.AF_Rif+`</rif>
           <OP_Id>`+this.OP_ID+`</OP_Id>
           <id>`+this.userSession.AF_Id+`</id>
         </RealizarPagoProveedores>
       </soap:Body>
     </soap:Envelope>`
  
     console.log(postData);
     //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
        this.httpClient.post("http://"+this.userSession.serverIPApp+"/WsMovil.asmx?op=RealizarPagoProveedores",postData,httpOptions )
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
                         console.log("Respuesta Pago Proveedores",search_array)
                         var check:string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].RealizarPagoProveedoresResponse['0'].RealizarPagoProveedoresResult['0'];
                         if(check == "0"){
                           self.navCtrl.push('AprobarRechazarProveedoresReciboPage',{
                            "EstadoLote":self.EstadoLote,
                            "OP_CodeTran":self.OP_CodeTran,
                            "OP_ID":self.OP_ID,
                            "NombreArchivo":self.NombreArchivo,
                            "TipoCarga":self.TipoCarga,
                            "usuarioProceso":self.usuarioProceso,
                            "correoUsuario":self.correoUsuario,
                            "CuentaDebitar":self.CuentaDebitar,
                            "TotalRegistros":self.TotalRegistros,
                            "Monto":self.Monto,
                            "MotivoPago":self.MotivoPago,
                            "fechaEfeSctiva":self.fechaEfectiva,
                            "horaEfectiva":self.horaEfectiva,
                            "estado":self.estado,
                            "checkFirmas":'true',
                           })
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AprobarRechazarProveedoresTokenPage');
  }

}

