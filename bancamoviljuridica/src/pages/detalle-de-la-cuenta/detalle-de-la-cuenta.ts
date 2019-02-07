import { Component } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'page-detalle-de-la-cuenta',
  templateUrl: 'detalle-de-la-cuenta.html'
})
export class DetalleDeLaCuentaPage {

  
  public listvalores:any[]=[];
  AF_CodCliente:string;
  AF_Rif:string;
  SNroCuenta:string;
  constructor(public userSession:UserSessionProvider, public navCtrl: NavController, public httpClient: HttpClient) {
    this.AF_CodCliente = userSession.AF_Codcliente;
    this.AF_Rif = userSession.AF_Rif;
    this.SNroCuenta = '01510021464210027163';
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
     var myDated:string = new Date().toISOString();
     var one:number=1;
     var myDateh:string = new Date().toISOString();
     var postData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
       <soap:Body>
         <AfiliadoMovimientos xmlns="http://tempuri.org/">
           <AF_CodCliente>`+this.AF_CodCliente+`</AF_CodCliente>
           <AF_Rif>`+this.AF_Rif+`</AF_Rif>
           <SNroCuenta>`+this.SNroCuenta+`</SNroCuenta>
           <fechad>`+myDated+`</fechad>
           <fechah>`+myDateh+`</fechah>
           <cantMov>20</cantMov>
         </AfiliadoMovimientos>
       </soap:Body>
     </soap:Envelope>`
     console.log('mando esto: '+ this.userSession.AF_Codcliente +' '+this.userSession.AF_Rif +' '+ postData )
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://localhost:2898/WsIbsMovil.asmx?op=AfiliadoMovimientos",postData,httpOptions )
     .subscribe(data => {
       console.log('Data: '+data['_body']); 
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
             var texto:string = "";
             var self = this;
             parseString(xml, self, function (err, result) {
                 try{
                       console.dir(result);
                       var str = JSON.stringify(result);
                       console.log("stringified: ", result);
                       var search_array = JSON.parse(str);

                       var i:number =0;
                       console.log("a");
                       var self2=self
                       search_array.p['soap:Envelope']['0']['soap:Body']['0'].AfiliadoMovimientosResponse['0'].AfiliadoMovimientosResult['0'].stmjvCuentas['0'].smtDetalle['0'].StmrdsjvDet
                       .forEach(element => {
                          var descripcion:string = element.SDesctrans['0'];
                          console.log("b");
                          var sign:string= element.SIndDebCre['0'];
                          console.log("c");
                          var amount:string= element.SMonto['0'];
                          console.log("d");
                          var color:boolean=true;
                          console.log("e");
                          if(sign=="0"){
                            amount = "-"+amount;
                            color=false;
                          }
                          console.log("f");
                          var itemLista = [descripcion,amount,color];
                          console.log("g");
                         // listvalores.push(itemLista);
                          console.log("h");
                          i = i +1;
                          //console.log("Aca",self2.listvalores);
                          self2.listvalores.push(itemLista);
                      });
                      console.log("Aca",self.listvalores);
                       /*console.log("result: ", search_array);
                       console.log("resulta: ", search_array['p']['soap:Envelope']['0']['soap:Body']['0'].MenuDinamicoJuridicoResponse['0'].MenuDinamicoJuridicoResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table);
                       try{
                         //Acá proceso la ráfaga que me trae las opciones del menú dinámico:
                         search_array['p']['soap:Envelope']['0']['soap:Body']['0'].MenuDinamicoJuridicoResponse['0'].MenuDinamicoJuridicoResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table
                         .forEach(element => {
                           //Dentro de este foreach me paro en cada elemento que trae
                           //los elementos del menú, si check es igual a las opciones del menú app.html
                             var check:string = element.MD_Nombre['0'];
                             if(check=="Posición Consolidada"){
                               //De ser true, guardo la variable validarPC en true en userSession
                                self.userSession.validarPC=true;
                             } else if(check=="Transferencias"){
                                self.userSession.validarTR=true;
                             } else if(check=="Tarjetas de Crédito"){
                                self.userSession.validarTDC=true;
                             } else if(check=="Autorización de Transacciones / Lotes"){
                                self.userSession.validarAPR=true;
                             }
                       });
                       }catch(Error){}*/


                       //Si en este punto no han ocurrido errores, procedemos a actualizar
                       //las variables del menú haciendo un llamado Events (Ver documentación Menú Dinámico)
                       //self.events.publish('session:created', true);

                       //Navegamos
                       //self.navCtrl.setRoot(WelcomePage);
                  }catch(Error){ 
                    //self.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                    //self.presentToast();
                   }
                 });
      });
      
    } catch (error) {
      
    }
  }
  
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }
  
}
