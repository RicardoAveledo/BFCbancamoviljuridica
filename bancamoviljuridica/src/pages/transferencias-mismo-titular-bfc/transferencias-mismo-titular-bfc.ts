import { Component } from '@angular/core';
import { NavController, Toast, NavParams } from 'ionic-angular';
import { ConfirmaciNTransferenciaMismoTitularBFCPage } from '../confirmaci-ntransferencia-mismo-titular-bfc/confirmaci-ntransferencia-mismo-titular-bfc';
import { TransferenciaMismoTitularBFCReciboPage } from '../transferencia-mismo-titular-bfcrecibo/transferencia-mismo-titular-bfcrecibo';
import { PosiciNConsolidadaPage } from '../posici-nconsolidada/posici-nconsolidada';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { TransferenciasPage } from '../transferencias/transferencias';
import { TransferenciaMismoTitularOtrosBancosPage } from '../transferencia-mismo-titular-otros-bancos/transferencia-mismo-titular-otros-bancos';
import { TransferenciaTercerosBFCPage } from '../transferencia-terceros-bfc/transferencia-terceros-bfc';
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

@Component({
  selector: 'page-transferencias-mismo-titular-bfc',
  templateUrl: 'transferencias-mismo-titular-bfc.html'
})
export class TransferenciasMismoTitularBFCPage {

  public checkFirstTime:boolean=true;
  public listvalores:any[]=[]; 
  public sortingListAccount:any[]=[]; 
  public sortingListDates:any[]=[]; 
  public listmeses:any[]=[]; 
  public cuentas:any[]=[];
  public AF_CodCliente:string;
  public AF_Rif:string;
  public SNroCuenta:string;
  public posicionSelected:number;
  cuentaDebito:string;
  cuentaCredito:string;
  public montoValue:number;
  public sdisponible:string;

  constructor(public navCtrl: NavController,public userSession:UserSessionProvider, public formBuilder: FormBuilder, 
  private toastCtrl: ToastController, private alertCtrl: AlertController, public navParams: NavParams,
  public httpClient: HttpClient) {
    this.AF_CodCliente = userSession.AF_Codcliente;
    this.AF_Rif = userSession.AF_Rif; 
    this.cuentas = userSession.cuentas;
    this.reloadAccountData();
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
       <AfiliadosCuentas xmlns="http://tempuri.org/">
         <AF_CodCliente>`+this.userSession.AF_Codcliente+`</AF_CodCliente>
         <AF_Rif>`+this.userSession.AF_Rif+`</AF_Rif>
       </AfiliadosCuentas>
     </soap:Body>
   </soap:Envelope>`

   console.log("No sirve"+this.userSession.AF_Codcliente+"-"+this.userSession.AF_Id);
   console.log(postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://localhost:2898/WsIbsMovil.asmx?op=AfiliadosCuentas",postData,httpOptions )
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
                       var cont:number = 0;
                       self.cuentas=[];
                      search_array.p['soap:Envelope']['0']['soap:Body']['0'].AfiliadosCuentasResponse['0'].AfiliadosCuentasResult['0'].sdjvCuentas['0'].sdsjvDetalle['0'].SumdsjvDet
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
                          var itemPosicion = cont;
                          var itemLista = [SNroCuenta,SBloqueado,SContable,SDiferido,SDisponible,itemPosicion,NroCuentaMasked];
                          cont = cont + 1;
                          //procesar cuentas para enmascararlas
                          var tipoCuenta:string = element.STipocuenta['0']
                          if(tipoCuenta=="NOW"){
                            self.cuentas.push(itemLista);
                          }
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
                       //self.navCtrl.setRoot(WelcomePage);
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

  public auxAmmount:number;
  onChangeAmmount(){
    this.montoValue = this.montoValue;
  } 

  changeValueCredit(value: any)
  {
    this.cuentaCredito=value
  }

  changeValueDebit(value: any)
  {

    this.cuentaDebito=value
  }

  loadSaldo(saldo:string){
    this.sdisponible=saldo;
  }

  showAlert(mensaje: string) {
    const alert = this.alertCtrl.create({
      title: 'BFC',
      subTitle: mensaje ,
      buttons: ['OK']
    });
    alert.present();
  }
  
  
  goBack(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }


  cuentadebitoForm = this.formBuilder.group({
    cuentadebito: ['',Validators.required]
  });

  cuentacreditoForm = this.formBuilder.group({
    cuentacredito: ['',Validators.required]
  });

  montoForm = this.formBuilder.group({
    monto: ['',Validators.required]
  });
  

  goToTransferenciasMismoTitularBFC(params){
    if (this.cuentacreditoForm.valid && this.cuentadebitoForm.valid && this.montoForm.valid)
  {
    if (!params) params = {};
    this.navCtrl.push(TransferenciasMismoTitularBFCPage);


  } else{
  }

  if(this.cuentacreditoForm.valid)
{

}
  }

  //Método que utiliza el boton de Continuar
  goToConfirmaciNTransferenciaMismoTitularBFC(params){
    if (this.cuentacreditoForm.valid && this.cuentadebitoForm.valid && this.montoForm.valid)
    {
      if (!params) params = {};
      this.navCtrl.push(ConfirmaciNTransferenciaMismoTitularBFCPage,{
        "cuentaDebito":this.cuentaDebito,
        "cuentaCredito":this.cuentaCredito,
        "montoValue":this.montoValue
      });
  } else{

    if (this.cuentadebitoForm.invalid)
    {
      this.showAlert('Debe seleccionar la cuenta origen');
    }

    else {
      if (this.cuentacreditoForm.invalid)
      {
        this.showAlert('Debe seleccionar la cuenta destino');
      }

      else {
        if (this.montoForm.invalid)
        {
          this.showAlert('Debe colocar un monto');
        }
      }

    }
  }


  }


  goToTransferenciaMismoTitularBFCRecibo(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaMismoTitularBFCReciboPage);
  }
  goToPosiciNConsolidada(params){
    if (!params) params = {};
    this.navCtrl.push(PosiciNConsolidadaPage);
  }
  goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeLaCuentaPage);
  }
  goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleDeTarjetaPage);
  }
  goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciasPage);
  }
  goToTransferenciaMismoTitularOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaMismoTitularOtrosBancosPage);
  }
  goToTransferenciaTercerosBFC(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosBFCPage);
  }
  goToTransferenciasTercerosDetalle(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciasTercerosDetallePage);
  }
  goToTransferenciaTercerosOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosPage);
  }
  goToTransferenciaTercerosOtrosBancosRecibo(params){
    if (!params) params = {};
    this.navCtrl.push(TransferenciaTercerosOtrosBancosReciboPage);
  }
}


