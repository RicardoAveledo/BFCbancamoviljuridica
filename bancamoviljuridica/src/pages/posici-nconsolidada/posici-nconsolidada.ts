import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DetallePrestamoPage } from '../detalle-prestamo/detalle-prestamo';

@IonicPage({
  name: 'PosiciNConsolidadaPage',
  segment: 'PosiciNConsolidadaPage'
})
@Component({
  selector: 'page-posici-nconsolidada',
  templateUrl: 'posici-nconsolidada.html'
})
export class PosiciNConsolidadaPage {
  CO_NOMBRES:string;
  public cuentas:any[]=[];
  public tdc:any[]=[];
  public prestamos:any[]=[];

  constructor(public userSession:UserSessionProvider, public navCtrl: NavController, public httpClient: HttpClient) {
    this.CO_NOMBRES = userSession.CO_NOMBRES;
    this.userSession.reloadAccountData();
    this.cuentas = userSession.cuentas;
    this.tdc = userSession.tdc;
    this.prestamos = userSession.prestamos;
  }


  goToDetalleDeLaCuenta(item:any[]){
    this.navCtrl.push('DetalleDeLaCuentaPage',{
      "cuentaselected":item, 
      "posicion":item[5],
    });
  }

  goToDetalleDeTarjeta(item:any[]){
    this.navCtrl.push('DetalleDeTarjetaPage',{
      "cuentaselected":item,
      "posicion":item[5],
    });
  }  
  goToPrestamos(item:any[]){

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
     var postData = `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
     <soap12:Body>
       <ConsultaPrestamos xmlns="http://tempuri.org/">
         <CodCliente>`+this.userSession.AF_Codcliente+`</CodCliente>
         <Rif>`+this.userSession.AF_Rif+`</Rif>
         <Cuenta>`+item[0]+`</Cuenta>
       </ConsultaPrestamos>
     </soap12:Body>
   </soap12:Envelope>`

   console.log(postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://"+this.userSession.serverIPApp+"/WsMovil.asmx?op=ConsultaPrestamos",postData,httpOptions )
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
                       console.log("DETALLE PRESTAMO",search_array);
                       var saldoTotal:string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].SSaldoActual['0'];
                       var montoCuota:string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].SMtoCuota['0'];
                       var fechaVencimiento:string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].SFechaVctoCredito['0'];
                       var montoOriginal:string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].SMtoOriginal['0'];
                       var fechaProximo:string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].SFechaProxPago['0'];
                       var tasa:string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].STasa['0'];
                       self.navCtrl.push('DetallePrestamoPage',{
                        "cuentaselected":item,
                        "saldoTotal":saldoTotal,
                        "montoCuota":montoCuota,
                        "fechaVencimiento":fechaVencimiento,
                        "montoOriginal":montoOriginal,
                        "fechaProximo":fechaProximo,
                        "tasa":tasa,
                        "posicion":item,
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
}
