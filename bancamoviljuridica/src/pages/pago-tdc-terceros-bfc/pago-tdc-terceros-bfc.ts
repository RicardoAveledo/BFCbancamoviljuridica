import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { TransferenciasTercerosDetallePage } from '../transferencias-terceros-detalle/transferencias-terceros-detalle';
import { TransferenciaTercerosOtrosBancosPage } from '../transferencia-terceros-otros-bancos/transferencia-terceros-otros-bancos';
import { TransferenciaTercerosOtrosBancosReciboPage } from '../transferencia-terceros-otros-bancos-recibo/transferencia-terceros-otros-bancos-recibo';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';
import { stringify } from '@angular/core/src/util';
import { PagoTdcTercerosBfcDetallePage } from '../pago-tdc-terceros-bfc-detalle/pago-tdc-terceros-bfc-detalle';
/**
 * Generated class for the PagoTdcTercerosBfcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PagoTdcTercerosBfcPage',
  segment: 'PagoTdcTercerosBfcPage'
})
@Component({
  selector: 'page-pago-tdc-terceros-bfc',
  templateUrl: 'pago-tdc-terceros-bfc.html',
})
export class PagoTdcTercerosBfcPage {

  public checkFirstTime:boolean=true;
  public listvalores:any[]=[]; 
  public sortingListAccount:any[]=[]; 
  public sortingListDates:any[]=[]; 
  public listmeses:any[]=[]; 
  public cuentas:any[]=[];
  public AF_CodCliente:string;
  public AF_Rif:string;
  public searchTerm:string;
  public filtered:string;
  public SNroCuenta:string;
  public posicionSelected:number;
  public cuentaDebito:string;
  public cuentaCredito:string;
  public montoValue:number;
  public cont:number=0;
  public sdisponible:string;
  public listFavoritos:any[]=[];
  public listFavoritosAux:any[]=[];

  constructor(public navCtrl: NavController,public userSession:UserSessionProvider, public formBuilder: FormBuilder, 
  private toastCtrl: ToastController, private alertCtrl: AlertController, public navParams: NavParams,
  public httpClient: HttpClient) {
    this.AF_CodCliente = userSession.AF_Codcliente;
    this.AF_Rif = userSession.AF_Rif; 
    this.cuentas = userSession.cuentas;
    this.reloadAccountData();
  }

  searchFavoritos(){ 
    console.log("Filtro: ",this.searchTerm);
    this.filtered = this.searchTerm;
    this.listFavoritosAux = this.transform(this.listFavoritos, this.searchTerm);
  }

  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it[2].toLowerCase().includes(terms); // only filter country name
    });
  }

  reloadAccountData(){    
    console.log("Esto esta en usersession.cuentos",this.cuentas);
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
       <AfiliadoFavoritosGrupoGetByAfiliado xmlns="http://tempuri.org/">
         <nAF_Id>`+this.userSession.AF_IdPrincipal+`</nAF_Id>
         <tipoFavoritoId>120</tipoFavoritoId>
       </AfiliadoFavoritosGrupoGetByAfiliado>
     </soap:Body>
   </soap:Envelope>`


   console.log("No sirve"+this.userSession.AF_Codcliente+"-"+this.userSession.AF_Id);
   console.log(postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://"+this.userSession.serverIPWS+"/WsFavoritos.asmx?op=AfiliadoFavoritosGrupoGetByAfiliado",postData,httpOptions )
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
                       console.log("FAVORITOS: ",search_array)
                       var counter:number=0
                       search_array.p['soap:Envelope']['0']['soap:Body']['0'].AfiliadoFavoritosGrupoGetByAfiliadoResponse['0'].AfiliadoFavoritosGrupoGetByAfiliadoResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table
                       .forEach(element => {
                          var AF_ID:any = element.AF_ID['0'];
                          var BANK_ID:any = element.BANK_ID['0'];
                          var Beneficiario:any = element.Beneficiario['0'];
                          var CedulaRif:any = element.CedulaRif['0'];
                          var Descripcion:any = element.Descripcion['0'];
                          var Email:any = element.Email['0'];
                          var NumeroInstrumento:any = element.NumeroInstrumento['0'];
                          var TipoDescripcion:any = element.TipoDescripcion['0'];
                          var TipoFavoritoID:any = element.TipoFavoritoID['0'];
                          var TipoTarjetaCredito:any = element.TipoTarjetaCredito['0'];
                          var dCompDate:any = element.dCompDate['0'];
                          var itemsToAdd:any[]=[AF_ID,BANK_ID,Beneficiario,CedulaRif,Descripcion,Email,NumeroInstrumento,
                            TipoDescripcion,TipoFavoritoID,TipoTarjetaCredito,dCompDate];
                          self.listFavoritos.push(itemsToAdd);
                          self.listFavoritosAux.push(itemsToAdd);
                          counter=counter+1;
                        });
                        self.cont = counter;
                        console.log(self.listFavoritos)
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

  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }
  goToTDCTercerosBFCDetalle(favoritoSelected:any[]){
    console.log("GoToTransferenciasTerceroDetalle",favoritoSelected);
    this.navCtrl.push('PagoTdcTercerosBfcDetallePage',{
      "favoritoSelected":favoritoSelected,
    });
  }
  goToTransferenciaTercerosOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciaTercerosOtrosBancosPage');
  }
  goToTransferenciaTercerosOtrosBancosRecibo(params){
    if (!params) params = {};
    this.navCtrl.push('TransferenciaTercerosOtrosBancosReciboPage');
  }
}
