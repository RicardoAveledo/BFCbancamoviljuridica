import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
/*
  Generated class for the UserSessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserSessionProvider {
  public validar:boolean = false;
  public validarPC:boolean = false;
  public validarTR:boolean = false;
  public validarTDC:boolean = false;
  public validarAPR:boolean = false;
  public cuentas:any[] = [];
  public tdc:any[] = [];
  public prestamos:any[] = [];
  public AF_CLAsig:string = "";
  public AF_Cedula:string = "";
  public AF_Clave:string = "";
  public AF_CodCliente1:string = "";
  public AF_CodPrincipal:string = "";
  public AF_Codcliente:string = "";
  public AF_DiasPassword:string = "";
  public AF_Especial:string = "";
  public AF_FecConst:string = "";
  public AF_FechaPassword:string = "";
  public AF_Id:string = "";
  public AF_IdPrincipal:string = "";
  public AF_NombrePrincipal:string = "";
  public AF_NombreUsuario:string = "";
  public AF_PassWordTransacciones:string = "";
  public AF_Password:string = ""; 
  public AF_PreguntaDesafio:string = "";
  public AF_RespuestaPD:string = "";
  public AF_Rif:string = "";
  public AF_TK_FechaCreacion:string = "";
  public AF_TK_FechaUltModificacion:string = "";
  public AF_TK_NombreUsuarioCreacion:string = "";
  public AF_TK_NombreUsuarioUltModificacion:string = "";
  public AF_TK_Status:string = "";  
  public AF_Tarjeta:string = "";
  public AF_Tipo:string = "";
  public CO_Celular:string = "";
  public CO_CodClienteADM:string = "";
  public CO_DocId:string = "";
  public CO_Email:string = "";  
  public CO_EmailRegistroIB:string = "";
  public CO_Id:string = "";  
  public CO_IdentADM:string = "";
  public CO_NOMBRES:string = "";
  public CO_NombresADM:string = "";
  public CO_TelefonoRegistroIB:string = "";
  public ES_Descripcion:string = "";
  public ES_Id:string = "";
  public FI_Descripcion:string = "";  
  public FI_Id:string = "";
  public PE_id:string = "";  
  public ST_Codigo:string = "";
  public ST_Descripcion:string = "";
  public ST_Id:string = "";
  public TI_Descripcion:string = "";
  public TI_Codigo:string = "";
  public TI_Id:string = "";        


  

//public serverIPApp:string = "10.60.102.178/IBBFCEMovil/app";      //57306 
//public serverIPWS:string = "10.60.102.178/IBBFCEMovils/ws";        //2898
//public serverIPApp:string = "10.60.63.58:8445/IBBFCEMovil/app";
//public serverIPApp:string = "10.60.63.58:8467";  
//public serverIPWS:string = "10.60.63.58:8477";  
//public serverIPApp:string = "localhost:57306";
//public serverIPWS:string = "localhost:2898";  
//public serverIPApp:string = "10.60.63.58:8445/IBBFCE";
//public serverIPWS:string = "10.60.63.58:8445/WSFCIBJuridicoIBS";  
//public serverIPApp:string = "201.248.81.244:8445/IBBFCE";
//public serverIPWS:string = "201.248.81.244:8445/WSFCIBJuridicoIBS";  
public serverIPApp:string = "10.60.102.100/IBBFCE";
public serverIPWS:string = "10.60.102.100/WSFCIBJuridicoIBS";  
//public serverIPApp:string = "10.60.102.91/IBBFCE";
//public serverIPWS:string = "10.60.102.91/WSFCIBJuridicoIBS";  

  constructor(public httpClient: HttpClient) {
    this.httpClient = httpClient;
    console.log('Hello UserSessionProvider Provider');
  }

  public reloadAccountData(){    
    console.log("Esto esta en usersession.cuentos",this.cuentas);
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
       <CuentasAsociadasGet xmlns="http://tempuri.org/">
         <AF_CodCliente>`+this.AF_Codcliente+`</AF_CodCliente>
         <AF_Rif>`+this.AF_Rif+`</AF_Rif>
         <AF_Id>`+this.AF_Id+`</AF_Id>
       </CuentasAsociadasGet>
     </soap:Body>
   </soap:Envelope>`

   console.log("No sirve"+this.AF_Codcliente+"-"+this.AF_Id);
   console.log(postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://"+this.serverIPApp+"/WsMovil.asmx?op=CuentasAsociadasGet",postData,httpOptions )
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
                       console.log("CUENTAS DEBUG: ", search_array);
                       var contcuentas:number = 0;
                       var conttdc:number = 0;
                       var contprestamos:number = 0;
                       self.cuentas=[];
                       self.tdc=[];
                       self.prestamos=[];
                      search_array.p['soap:Envelope']['0']['soap:Body']['0'].CuentasAsociadasGetResponse['0'].CuentasAsociadasGetResult['0'].SumdsjvDet
                      .forEach(element => {
                        //Dentro de este foreach me paro en cada elemento que trae 
                          var SBloqueado:string = element.SBloqueado['0']
                          var SContable:string = element.SContable['0']
                          var SDiferido:string = element.SDiferido['0']
                          var SDisponible:string = element.SDisponible['0']
                          var SNroCuenta:string = element.SNroCuenta['0']
                          var NroCuentaMasked2:string = SNroCuenta.substr(-4);
                          var NroCuentaMasked1:string = SNroCuenta.substr(0,4);
                          var NroCuentaMasked:string = NroCuentaMasked1+"************"+NroCuentaMasked2;
                          var tipoCuenta:string = element.STipocuenta['0'];
                          var SCodMoneda:string = element.SCodMoneda['0']; 
                          console.log("SCodMoneda: ", SCodMoneda);
                          if(tipoCuenta=="TDC" && SCodMoneda=="VES"){
                            //if(SCodMoneda=="VES"){
                              console.log("Tipo TDC",conttdc);
                              var itemPosicion = conttdc;
                              conttdc = conttdc + 1;
                              var SFechaPagoAntes:string = element.SFechaPagoAntes['0']
                              var day:string = SFechaPagoAntes.substr(0,2);
                              var month:string = SFechaPagoAntes.substr(2,2);
                              var year:string = SFechaPagoAntes.substr(-4);
                              var fechapago:string= day+"-"+month+"-"+year;
                              var SPagoMinimo:string = element.SPagoMinimo['0']
                              var itemLista = [SNroCuenta,SBloqueado,SContable,SDiferido,SDisponible,itemPosicion,NroCuentaMasked,fechapago,SPagoMinimo];  
                            //}
                            }else if(SCodMoneda=="VES" && (tipoCuenta=="NOW" || tipoCuenta=="DDA")) {
                           //   if(SCodMoneda=="VES"){
                            console.log("Tipo cuentas",contcuentas);
                            var itemPosicion = contcuentas;
                            contcuentas = contcuentas + 1;
                            var itemLista = [SNroCuenta,SBloqueado,SContable,SDiferido,SDisponible,itemPosicion,NroCuentaMasked];
                            //  }  
                          }  else if(SCodMoneda=="VES" && tipoCuenta=="LNS") {
                            //   if(SCodMoneda=="VES"){
                             console.log("Tipo prestamo",contprestamos);
                             var itemPosicion = contprestamos;
                             contprestamos = contprestamos + 1;
                             var itemLista = [SNroCuenta,SBloqueado,SContable,SDiferido,SDisponible,itemPosicion,NroCuentaMasked];
                             //  }  
                           }                   
                          //procesar cuentas para enmascararlas
                          if(tipoCuenta=="TDC" && SCodMoneda=="VES"){
                            self.tdc.push(itemLista);
                          }else if (SCodMoneda=="VES" && (tipoCuenta=="NOW" || tipoCuenta=="DDA")){
                            self.cuentas.push(itemLista);
                          } else if (SCodMoneda=="VES" && tipoCuenta=="LNS"){
                            self.prestamos.push(itemLista);
                          } 
                          console.dir("K");
                        });
                       self.cuentas = self.cuentas;
                       self.tdc = self.tdc;
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

  basicHttpConnectionMethod(){
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
         <CuentasAsociadasGet xmlns="http://tempuri.org/">
           <AF_CodCliente>`+this.AF_Codcliente+`</AF_CodCliente>
           <AF_Rif>`+this.AF_Rif+`</AF_Rif>
           <AF_Id>`+this.AF_Id+`</AF_Id>
         </CuentasAsociadasGet>
       </soap:Body>
     </soap:Envelope>`
  
     console.log(postData);
     //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
        this.httpClient.post("http://"+this.serverIPApp+"/WsMovil.asmx?op=CuentasAsociadasGet",postData,httpOptions )
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

}