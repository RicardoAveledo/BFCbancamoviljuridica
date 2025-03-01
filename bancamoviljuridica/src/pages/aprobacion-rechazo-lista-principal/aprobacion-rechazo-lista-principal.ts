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
import { AprobaciNRechazoPage } from '../aprobaci-nrechazo/aprobaci-nrechazo';

/**
 * Generated class for the AprobacionRechazoListaPrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'AprobacionRechazoListaPrincipalPage',
  segment: 'AprobacionRechazoListaPrincipalPage'
})
@Component({
  selector: 'page-aprobacion-rechazo-lista-principal',
  templateUrl: 'aprobacion-rechazo-lista-principal.html',
})
export class AprobacionRechazoListaPrincipalPage {

  public checkFirstTime:boolean=true;
  public listvalores:any[]=[]; 
  public sortingListAccount:any[]=[]; 
  public sortingListDates:any[]=[]; 
  public listmeses:any[]=[]; 
  public cuentas:any[]=[];
  public tdc:any[]=[];
  public AF_CodCliente:string;
  public AF_Rif:string;
  public AF_ID:string;
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
  public transferencias:any[]=[];
  public pagosTDC:any[]=[];
  public nominas:any[]=[];
  public nominasPorAprobar:any[]=[];
  public nominasRechazado:any[]=[];
  public nominasProcesado:any[]=[];
  public proveedores:any[]=[];
  public proveedoresPorAprobar:any[]=[];
  public proveedoresRechazado:any[]=[];
  public proveedoresProcesado:any[]=[];
  public transferenciasSelected:boolean =false;
  public pagoTDCSelected:boolean =false;
  public nominaSelected:boolean =false;
  public proveedoresSelected:boolean =false;
  public cantidadFirmas:string;
  public firmasFaltantes:string;
  public EstadoLote:string;
  
  

  constructor(public navCtrl: NavController,public userSession:UserSessionProvider, public formBuilder: FormBuilder, 
    private toastCtrl: ToastController, private alertCtrl: AlertController, public navParams: NavParams,
    public httpClient: HttpClient) {

    console.log("Esto esta en usersession.cuentas",this.cuentas);
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
       <ModelosPorAprobar xmlns="http://tempuri.org/">
       <id>`+this.userSession.AF_Id+`</id>
       <Rif>`+this.userSession.AF_Rif+`</Rif>
       </ModelosPorAprobar>
     </soap:Body>
   </soap:Envelope>`

   console.log(postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://"+this.userSession.serverIPApp+"/WsMovil.asmx?op=ModelosPorAprobar",postData,httpOptions )
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
                       console.log('MODELOS POR APROBAR',search_array);
                       search_array.p['soap:Envelope']['0']['soap:Body']['0'].ModelosPorAprobarResponse['0'].ModelosPorAprobarResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table
                       .forEach(element => {  
                        var BANK_ID:string = element.BANK_ID['0'];
                        var BANK_NOMBRE:string = element.BANK_NOMBRE['0'];
                        var Cod:string = element.Cod['0'];
                        var Es_Descripcion:string = element.Es_Descripcion['0'];
                        var Nombre:string = element.Nombre['0'];
                        var OP_Beneficiario:string = element.OP_Beneficiario['0'];
                        var OP_CodClienteGrupo:string = element.OP_CodClienteGrupo['0'];
                        var OP_CodeTran:string = element.OP_CodeTran['0'];
                        var OP_Concepto:string = element.OP_Concepto['0'];
                        var OP_DATA:string = element.OP_DATA['0'];
                        var OP_DATE:string = element.OP_DATE['0'];
                        var OP_Destino:string = element.OP_Destino['0'];
                        var OP_ID:string = element.OP_ID['0'];
                        var OP_IdBeneficiario:string = element.OP_IdBeneficiario['0'];
                        var OP_IdServicio:string = element.OP_IdServicio['0'];
                        var OP_Interface:string = element.OP_Interface['0'];
                        var OP_Mail:string = element.OP_Mail['0'];
                        var OP_Monto:string = element.OP_Monto['0'];
                        var OP_OlbId:string = element.OP_OlbId['0'];
                        var OP_Origen:string = element.OP_Origen['0'];
                        var OP_RifGrupo:string = element.OP_RifGrupo['0'];
                        if(Cod=="16"||Cod=="17"||Cod=="19"||Cod=="20"){
                            self.transferencias.push({
                              'BANK_ID':BANK_ID,
                              'BANK_NOMBRE':BANK_NOMBRE,
                              'Cod':Cod,
                              'Es_Descripcion':Es_Descripcion,
                              'Nombre':Nombre,
                              'OP_Beneficiario':OP_Beneficiario,
                              'OP_CodClienteGrupo':OP_CodClienteGrupo,
                              'OP_CodeTran':OP_CodeTran,
                              'OP_Concepto':OP_Concepto,
                              'OP_DATA':OP_DATA,
                              'OP_DATE':OP_DATE,
                              'OP_Destino':OP_Destino,
                              'OP_ID':OP_ID,
                              'OP_IdBeneficiario':OP_IdBeneficiario,
                              'OP_IdServicio':OP_IdServicio,
                              'OP_Interface':OP_Interface,
                              'OP_Mail':OP_Mail,
                              'OP_Monto':OP_Monto,
                              'OP_OlbId':OP_OlbId,
                              'OP_Origen':OP_Origen,
                              'OP_RifGrupo':OP_RifGrupo,
                            });
                          }
                        
                        if(Cod=="24"||Cod=="25"||Cod=="27"||Cod=="28"){
                          self.pagosTDC.push({
                            'BANK_ID':BANK_ID,
                            'BANK_NOMBRE':BANK_NOMBRE,
                            'Cod':Cod,
                            'Es_Descripcion':Es_Descripcion,
                            'Nombre':Nombre,
                            'OP_Beneficiario':OP_Beneficiario,
                            'OP_CodClienteGrupo':OP_CodClienteGrupo,
                            'OP_CodeTran':OP_CodeTran,
                            'OP_Concepto':OP_Concepto,
                            'OP_DATA':OP_DATA,
                            'OP_DATE':OP_DATE,
                            'OP_Destino':OP_Destino,
                            'OP_ID':OP_ID,
                            'OP_IdBeneficiario':OP_IdBeneficiario,
                            'OP_IdServicio':OP_IdServicio,
                            'OP_Interface':OP_Interface,
                            'OP_Mail':OP_Mail,
                            'OP_Monto':OP_Monto,
                            'OP_OlbId':OP_OlbId,
                            'OP_Origen':OP_Origen,
                            'OP_RifGrupo':OP_RifGrupo,
                          });
                        }
                      
                      if(Cod=="32" && Es_Descripcion =="Por Aprobar"){
                        self.nominasPorAprobar.push({
                          'BANK_ID':BANK_ID,
                          'BANK_NOMBRE':BANK_NOMBRE,
                          'Cod':Cod,
                          'Es_Descripcion':Es_Descripcion,
                          'Nombre':Nombre,
                          'OP_Beneficiario':OP_Beneficiario,
                          'OP_CodClienteGrupo':OP_CodClienteGrupo,
                          'OP_CodeTran':OP_CodeTran,
                          'OP_Concepto':OP_Concepto,
                          'OP_DATA':OP_DATA,
                          'OP_DATE':OP_DATE,
                          'OP_Destino':OP_Destino,
                          'OP_ID':OP_ID,
                          'OP_IdBeneficiario':OP_IdBeneficiario,
                          'OP_IdServicio':OP_IdServicio,
                          'OP_Interface':OP_Interface,
                          'OP_Mail':OP_Mail,
                          'OP_Monto':OP_Monto,
                          'OP_OlbId':OP_OlbId,
                          'OP_Origen':OP_Origen,
                          'OP_RifGrupo':OP_RifGrupo,
                        });
                      }

                      if(Cod=="32" && Es_Descripcion =="Rechazado"){
                        self.nominasRechazado.push({
                          'BANK_ID':BANK_ID,
                          'BANK_NOMBRE':BANK_NOMBRE,
                          'Cod':Cod,
                          'Es_Descripcion':Es_Descripcion,
                          'Nombre':Nombre,
                          'OP_Beneficiario':OP_Beneficiario,
                          'OP_CodClienteGrupo':OP_CodClienteGrupo,
                          'OP_CodeTran':OP_CodeTran,
                          'OP_Concepto':OP_Concepto,
                          'OP_DATA':OP_DATA,
                          'OP_DATE':OP_DATE,
                          'OP_Destino':OP_Destino,
                          'OP_ID':OP_ID,
                          'OP_IdBeneficiario':OP_IdBeneficiario,
                          'OP_IdServicio':OP_IdServicio,
                          'OP_Interface':OP_Interface,
                          'OP_Mail':OP_Mail,
                          'OP_Monto':OP_Monto,
                          'OP_OlbId':OP_OlbId,
                          'OP_Origen':OP_Origen,
                          'OP_RifGrupo':OP_RifGrupo,
                        });
                      }

                      if(Cod=="32" && Es_Descripcion =="Procesado"){
                        self.nominasProcesado.push({
                          'BANK_ID':BANK_ID,
                          'BANK_NOMBRE':BANK_NOMBRE,
                          'Cod':Cod,
                          'Es_Descripcion':Es_Descripcion,
                          'Nombre':Nombre,
                          'OP_Beneficiario':OP_Beneficiario,
                          'OP_CodClienteGrupo':OP_CodClienteGrupo,
                          'OP_CodeTran':OP_CodeTran,
                          'OP_Concepto':OP_Concepto,
                          'OP_DATA':OP_DATA,
                          'OP_DATE':OP_DATE,
                          'OP_Destino':OP_Destino,
                          'OP_ID':OP_ID,
                          'OP_IdBeneficiario':OP_IdBeneficiario,
                          'OP_IdServicio':OP_IdServicio,
                          'OP_Interface':OP_Interface,
                          'OP_Mail':OP_Mail,
                          'OP_Monto':OP_Monto,
                          'OP_OlbId':OP_OlbId,
                          'OP_Origen':OP_Origen,
                          'OP_RifGrupo':OP_RifGrupo,
                        });
                      }

                      if(Cod=="64" && Es_Descripcion =="Por Aprobar"){
                        self.proveedoresPorAprobar.push({
                          'BANK_ID':BANK_ID,
                          'BANK_NOMBRE':BANK_NOMBRE,
                          'Cod':Cod,
                          'Es_Descripcion':Es_Descripcion,
                          'Nombre':Nombre,
                          'OP_Beneficiario':OP_Beneficiario,
                          'OP_CodClienteGrupo':OP_CodClienteGrupo,
                          'OP_CodeTran':OP_CodeTran,
                          'OP_Concepto':OP_Concepto,
                          'OP_DATA':OP_DATA,
                          'OP_DATE':OP_DATE,
                          'OP_Destino':OP_Destino,
                          'OP_ID':OP_ID,
                          'OP_IdBeneficiario':OP_IdBeneficiario,
                          'OP_IdServicio':OP_IdServicio,
                          'OP_Interface':OP_Interface,
                          'OP_Mail':OP_Mail,
                          'OP_Monto':OP_Monto,
                          'OP_OlbId':OP_OlbId,
                          'OP_Origen':OP_Origen,
                          'OP_RifGrupo':OP_RifGrupo,
                        });
                      }

                      if(Cod=="64" && Es_Descripcion =="Rechazado"){
                        self.proveedoresRechazado.push({
                          'BANK_ID':BANK_ID,
                          'BANK_NOMBRE':BANK_NOMBRE,
                          'Cod':Cod,
                          'Es_Descripcion':Es_Descripcion,
                          'Nombre':Nombre,
                          'OP_Beneficiario':OP_Beneficiario,
                          'OP_CodClienteGrupo':OP_CodClienteGrupo,
                          'OP_CodeTran':OP_CodeTran,
                          'OP_Concepto':OP_Concepto,
                          'OP_DATA':OP_DATA,
                          'OP_DATE':OP_DATE,
                          'OP_Destino':OP_Destino,
                          'OP_ID':OP_ID,
                          'OP_IdBeneficiario':OP_IdBeneficiario,
                          'OP_IdServicio':OP_IdServicio,
                          'OP_Interface':OP_Interface,
                          'OP_Mail':OP_Mail,
                          'OP_Monto':OP_Monto,
                          'OP_OlbId':OP_OlbId,
                          'OP_Origen':OP_Origen,
                          'OP_RifGrupo':OP_RifGrupo,
                        });
                      }

                      if(Cod=="64" && Es_Descripcion =="Procesado"){
                        self.proveedoresProcesado.push({
                          'BANK_ID':BANK_ID,
                          'BANK_NOMBRE':BANK_NOMBRE,
                          'Cod':Cod,
                          'Es_Descripcion':Es_Descripcion,
                          'Nombre':Nombre,
                          'OP_Beneficiario':OP_Beneficiario,
                          'OP_CodClienteGrupo':OP_CodClienteGrupo,
                          'OP_CodeTran':OP_CodeTran,
                          'OP_Concepto':OP_Concepto,
                          'OP_DATA':OP_DATA,
                          'OP_DATE':OP_DATE,
                          'OP_Destino':OP_Destino,
                          'OP_ID':OP_ID,
                          'OP_IdBeneficiario':OP_IdBeneficiario,
                          'OP_IdServicio':OP_IdServicio,
                          'OP_Interface':OP_Interface,
                          'OP_Mail':OP_Mail,
                          'OP_Monto':OP_Monto,
                          'OP_OlbId':OP_OlbId,
                          'OP_Origen':OP_Origen,
                          'OP_RifGrupo':OP_RifGrupo,
                        });
                      }

                        console.log('Monto:', OP_Monto); 
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

  loadPorAprobarNomina(){
    this.nominas = this.nominasPorAprobar;
    this.EstadoLote = "Por Aprobar";
    console.log("Por Aprobar", this.nominas)
  }

  loadProcesadosNomina(){
    this.nominas = this.nominasProcesado;
    this.EstadoLote = "Procesado";
  }

  loadRechazadosNomina(){
    this.nominas = this.nominasRechazado;
    this.EstadoLote = "Rechazado";
  }

  loadPorAprobarProveedores(){
    this.proveedores = this.proveedoresPorAprobar;
    this.EstadoLote = "Por Aprobar";
  }

  loadProcesadosProveedores(){
    this.proveedores = this.proveedoresProcesado;
    this.EstadoLote = "Procesado";
  }

  loadRechazadosProveedores(){
    this.proveedores = this.proveedoresRechazado;
    this.EstadoLote = "Rechazado";
  }

  loadTransferencias(){
    if(!this.transferenciasSelected){
      this.transferenciasSelected=!this.transferenciasSelected;
      this.pagoTDCSelected=false;
      this.nominaSelected=false;
      this.proveedoresSelected=false;
    }
  }

  loadPagoTDC(){
    if(!this.pagoTDCSelected){
      this.pagoTDCSelected=!this.pagoTDCSelected;
      this.transferenciasSelected=false;
      this.nominaSelected=false;
      this.proveedoresSelected=false;
    }
  }
  
  loadNomina(){
    if(!this.nominaSelected){
      this.nominaSelected=!this.nominaSelected;
      this.pagoTDCSelected=false;
      this.transferenciasSelected=false;
      this.proveedoresSelected=false;
      this.loadPorAprobarNomina();
    }
  }
  
  loadProveedores(){
    if(!this.proveedoresSelected){
      this.proveedoresSelected=!this.proveedoresSelected;
      this.pagoTDCSelected=false;
      this.nominaSelected=false;
      this.transferenciasSelected=false;
      this.loadPorAprobarProveedores();
    }
  }

  loadDetalle(item){

    console.log("Esto esta en usersession.cuentas",this.cuentas);
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
         <Cod>`+item.Cod+`</Cod>
         <CTA_ID>`+item.OP_Origen+`</CTA_ID>
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
                       console.log("MODELO CREADO: ", search_array);
                       self.cantidadFirmas = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ModelosGetResponse['0'].ModelosGetResult['0'].Modelo['0'].CT_CantFirmas['0'];

                       console.log("Esto esta en usersession.cuentas",self.cuentas);
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
                          <FirmasVer xmlns="http://tempuri.org/">
                            <OP_Id>`+item.OP_ID+`</OP_Id>
                          </FirmasVer>
                        </soap:Body>
                      </soap:Envelope>`
                   
                      console.log(postData);
                      //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
                        self.httpClient.post("http://"+self.userSession.serverIPApp+"/WsMovil.asmx?op=FirmasVer",postData,httpOptions )
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
                                var self2 = self;
                                parseString(xml, self2, function (err, result) {
                                    try{
                                          console.dir(result);
                                          var str = JSON.stringify(result);
                                          console.log("stringified: ", result);
                                          var search_array = JSON.parse(str);
                                          console.log("Firmas Restantes: ",search_array)
                                          self2.firmasFaltantes = search_array.p['soap:Envelope']['0']['soap:Body']['0'].FirmasVerResponse['0'].FirmasVerResult['0'];
                                          if(item.Cod=="64" || item.Cod=="32"){
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
                                                 <PagoNomina xmlns="http://tempuri.org/">
                                                   <Rif>`+self2.userSession.AF_Rif+`</Rif>
                                                   <op>`+item.OP_CodeTran+`</op>
                                                 </PagoNomina>
                                               </soap:Body>
                                             </soap:Envelope>`
                                        
                                           console.log(postData);
                                           //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
                                              self2.httpClient.post("http://"+self2.userSession.serverIPApp+"/WsMovil.asmx?op=PagoNomina",postData,httpOptions )
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
                                                     var self = self2;
                                                     parseString(xml, self, function (err, result) {
                                                         try{
                                                               console.dir(result);
                                                               var str = JSON.stringify(result);
                                                               console.log("stringified: ", result);
                                                               var search_array = JSON.parse(str);
                                                               console.log("Campos Nomina", search_array);
                                                               var OP_CodeTran    : string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].PagoNominaResponse['0'].PagoNominaResult['0']['diffgr:diffgram']['0'].DocumentElement['0'].Table_x0020_10['0'].OP_CodeTran['0']
                                                               var FechaValor     : string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].PagoNominaResponse['0'].PagoNominaResult['0']['diffgr:diffgram']['0'].DocumentElement['0'].Table_x0020_10['0'].FechaValor['0']
                                                               var HoraValor      : string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].PagoNominaResponse['0'].PagoNominaResult['0']['diffgr:diffgram']['0'].DocumentElement['0'].Table_x0020_10['0'].HoraValor['0']
                                                               var NombreArchivo  : string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].PagoNominaResponse['0'].PagoNominaResult['0']['diffgr:diffgram']['0'].DocumentElement['0'].Table_x0020_10['0'].NombreArchivo['0']
                                                               var EstadoLote     : string = self2.EstadoLote;
                                                               var TotalRegistros : string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].PagoNominaResponse['0'].PagoNominaResult['0']['diffgr:diffgram']['0'].DocumentElement['0'].Table_x0020_10['0'].TotalRegistros['0']
                                                               var Monto          : string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].PagoNominaResponse['0'].PagoNominaResult['0']['diffgr:diffgram']['0'].DocumentElement['0'].Table_x0020_10['0'].Monto['0']
                                                               var TipoCarga      : string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].PagoNominaResponse['0'].PagoNominaResult['0']['diffgr:diffgram']['0'].DocumentElement['0'].Table_x0020_10['0'].TipoCarga['0']
                                                               var MotivoPago     : string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].PagoNominaResponse['0'].PagoNominaResult['0']['diffgr:diffgram']['0'].DocumentElement['0'].Table_x0020_10['0'].MotivoPago['0']
                                                               var CuentaDebitar  : string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].PagoNominaResponse['0'].PagoNominaResult['0']['diffgr:diffgram']['0'].DocumentElement['0'].Table_x0020_10['0'].CuentaDebitar['0'];
                                                               console.log("Mando esto al Detalle: ", OP_CodeTran    +" " + FechaValor     +" " + HoraValor      +" " + NombreArchivo  +" " + EstadoLote     +" " + TotalRegistros +" " + Monto          +" " + TipoCarga      +" " + MotivoPago     +" " + CuentaDebitar  )
                                                               self2.navCtrl.push('AprobaciNRechazoPage',{
                                                                  'itemPassed':item,
                                                                  'firmasFaltantes': self2.firmasFaltantes,
                                                                  'cantidadFirmas': self2.cantidadFirmas,
                                                                  'OP_CodeTran':OP_CodeTran,
                                                                  'FechaValor':FechaValor,
                                                                  'HoraValor':HoraValor,
                                                                  'NombreArchivo':NombreArchivo,
                                                                  'EstadoLote':EstadoLote,
                                                                  'TotalRegistros':TotalRegistros,
                                                                  'Monto':Monto,
                                                                  'TipoCarga':TipoCarga,
                                                                  'MotivoPago':MotivoPago,
                                                                  'CuentaDebitar':CuentaDebitar,
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
                                          } else {
                                            self2.navCtrl.push('AprobaciNRechazoPage',{
                                              'itemPassed':item,
                                              'firmasFaltantes': self2.firmasFaltantes,
                                              'cantidadFirmas': self2.cantidadFirmas,
                                            });
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
    console.log('ionViewDidLoad AprobacionRechazoConsultaPage');
  }
  loadSaldo() {
    console.log('Selected');
  }

  goBack(){
    this.navCtrl.pop();
  }
}
