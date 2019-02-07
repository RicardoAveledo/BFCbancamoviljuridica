import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';

@Component({
  selector: 'page-posici-nconsolidada',
  templateUrl: 'posici-nconsolidada.html'
})
export class PosiciNConsolidadaPage {
  CO_NOMBRES:string;
  constructor(public userSession:UserSessionProvider, public navCtrl: NavController, public httpClient: HttpClient) {
    this.CO_NOMBRES = userSession.CO_NOMBRES;

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
         <CuentasAsociadasGetByAF_Id xmlns="http://tempuri.org/">
           <AF_Id>`+this.userSession.AF_Id+`</AF_Id>
         </CuentasAsociadasGetByAF_Id>
       </soap:Body>
     </soap:Envelope>`
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://localhost:2898/WsAfiliados.asmx?op=CuentasAsociadasGetByAF_Id",postData,httpOptions )
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


  goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeLaCuentaPage);
  }goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeTarjetaPage);
  }
}
