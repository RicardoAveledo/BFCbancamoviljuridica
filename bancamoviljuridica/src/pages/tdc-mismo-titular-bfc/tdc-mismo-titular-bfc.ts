import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';
import { stringify } from '@angular/core/src/util';

/**
 * Generated class for the TdcMismoTitularBfcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TdcMismoTitularBfcPage',
  segment: 'TdcMismoTitularBfcPage'
})
@Component({
  selector: 'page-tdc-mismo-titular-bfc',
  templateUrl: 'tdc-mismo-titular-bfc.html',
})
export class TdcMismoTitularBfcPage {
  public checkFirstTime:boolean=true;
  public listvalores:any[]=[]; 
  public sortingListAccount:any[]=[]; 
  public sortingListDates:any[]=[]; 
  public listmeses:any[]=[]; 
  public cuentas:any[]=[];
  public cuentaselected:any[]=[];
  public AF_CodCliente:string;
  public AF_Rif:string;
  public SBloqueado:string ;
  public SContable:string;
  public SDiferido:string;
  public SDisponible:string;
  public SNroCuenta:string;
  public posicionSelected:number;
  constructor(public userSession:UserSessionProvider, public navCtrl: NavController, public httpClient: HttpClient, public navParams: NavParams) {
    this.AF_CodCliente = userSession.AF_Codcliente;
    this.AF_Rif = userSession.AF_Rif;
    this.SNroCuenta = '01510021464210027163';
    this.cuentaselected = navParams.get('cuentaselected');
    this.posicionSelected = navParams.get('posicion');
    this.cuentas = userSession.cuentas;
    this.reloadAccountData();
  }

  reloadAccountData(){    
    var itemselected:any[] = this.cuentas[this.posicionSelected]
    console.log("Esto esta en usersession.cuentos",this.cuentas);
    //Estandar: [SNroCuenta,SBloqueado,SContable,SDiferido,SDisponible];
    this.SBloqueado=itemselected[1];
    this.SContable=itemselected[2];
    this.SDiferido=itemselected[3];
    this.SDisponible=itemselected[4];
    console.log(itemselected[0]);
    this.listvalores=[];
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
       <AfiliadosCuentas xmlns="http://tempuri.org/">
         <AF_CodCliente>`+this.userSession.AF_Codcliente+`</AF_CodCliente>
         <AF_Rif>`+this.userSession.AF_Rif+`</AF_Rif>
       </AfiliadosCuentas>
     </soap:Body>
   </soap:Envelope>`

   console.log("No sirve"+this.userSession.AF_Codcliente+"-"+this.userSession.AF_Id);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://localhost:2898/WsIbsMovil.asmx?op=AfiliadosCuentas",postData,httpOptions )
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
            // var texto:string = "";
             var self = this;
             parseString(xml, self, function (err, result) {
                 try{
                       console.dir(result);
                       var str = JSON.stringify(result);
                       console.log("stringified: ", result);
                       var search_array = JSON.parse(str);
                       var cont:number = 0;
                      search_array.p['soap:Envelope']['0']['soap:Body']['0'].AfiliadosCuentasResponse['0'].AfiliadosCuentasResult['0'].sdjvCuentas['0'].sdsjvDetalle['0'].SumdsjvDet
                       .forEach(element => {
                        //Dentro de este foreach me paro en cada elemento que trae 
                          var SBloqueado:string = element.SBloqueado['0']
                          var SContable:string = element.SContable['0']
                          var SDiferido:string = element.SDiferido['0']
                          var SDisponible:string = element.SDisponible['0']
                          var SNroCuenta:string = element.SNroCuenta['0']
                          var itemPosicion = cont;
                          var itemLista = [SNroCuenta,SBloqueado,SContable,SDiferido,SDisponible,itemPosicion];
                          cont = cont + 1;
                          //procesar cuentas para enmascararlas
                          self.cuentas.push(itemLista);
                        });
                       self.userSession.cuentas = self.cuentas;

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
                       //self.navCtrl.setRoot('WelcomePage');
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
    console.log('ionViewDidLoad TdcMismoTitularBfcPage');
  }
  
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }

}
