import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session'; 
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';

/**
 * Generated class for the DetallePrestamoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'DetallePrestamoPage',
  segment: 'DetallePrestamoPage'
})
@Component({
  selector: 'page-detalle-prestamo',
  templateUrl: 'detalle-prestamo.html',
})
export class DetallePrestamoPage {
  public cuentaselected:string ;
  public saldoTotal:string;
  public montoCuota:string;
  public fechaVencimiento:string;
  public montoOriginal:string;
  public fechaProximo:string;
  public tasa:string;
  public posicion:string;
  public prestamos:any[]=[];

  constructor(public navParams:NavParams,public userSession:UserSessionProvider, public navCtrl: NavController, public httpClient: HttpClient) {
    this.cuentaselected = navParams.get('cuentaselected');
    this.saldoTotal = navParams.get('saldoTotal');
    this.montoCuota = navParams.get('montoCuota');
    this.fechaVencimiento = navParams.get('fechaVencimiento');
    this.montoOriginal = navParams.get('montoOriginal');
    this.fechaProximo = navParams.get('fechaProximo');
    this.tasa = navParams.get('tasa');
    this.posicion = navParams.get('posicion'); 
    this.prestamos = userSession.prestamos;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePrestamoPage');
  }

  reloadPrestamo(cuenta:string){

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
         <Cuenta>`+cuenta+`</Cuenta>
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
                       self.saldoTotal = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].SSaldoActual['0'];
                       self.montoCuota = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].SMtoCuota['0'];
                       self.fechaVencimiento = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].SFechaVctoCredito['0'];
                       self.montoOriginal = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].SMtoOriginal['0'];
                       self.fechaProximo = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].SFechaProxPago['0'];
                       self.tasa = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ConsultaPrestamosResponse['0'].ConsultaPrestamosResult['0'].consuldsjv['0'].STasa['0'];
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

  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }
}
