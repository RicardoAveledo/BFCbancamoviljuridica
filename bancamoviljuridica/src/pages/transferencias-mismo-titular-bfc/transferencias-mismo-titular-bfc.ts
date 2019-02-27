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
import { IfObservable } from 'rxjs/observable/IfObservable';

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
  public tdc:any[]=[];
  public AF_CodCliente:string;
  public AF_Rif:string;
  public SNroCuenta:string;
  public posicionSelected:number;
  public cuentaDebito:string;
  public cuentaCredito:string;
  public cuentaDebitoFull:string;
  public cuentaCreditoFull:string;
  public montoValue:number;
  public sdisponible:number;

  constructor(public navCtrl: NavController,public userSession:UserSessionProvider, public formBuilder: FormBuilder, 
  private toastCtrl: ToastController, private alertCtrl: AlertController, public navParams: NavParams,
  public httpClient: HttpClient) {
    this.AF_CodCliente = userSession.AF_Codcliente;
    this.AF_Rif = userSession.AF_Rif; 
    this.userSession.reloadAccountData();
    this.cuentas = userSession.cuentas;
    this.tdc = userSession.tdc;
  }


  public auxAmmount:number;

  changeValueCredit(value: any)
  {
    this.cuentaCredito=value
  }

  changeValueDebit(value: any)
  {
    this.cuentaDebito=value
  }

  loadSaldoCred(item:any[]){
    this.cuentaCreditoFull = item[0];
  }

  loadSaldoDebt(item:any[]){
    this.sdisponible=item[4];
    this.cuentaDebitoFull = item[0];
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
      if (+this.sdisponible<+this.montoValue){
        this.showAlert('La cuenta seleccionada no dispone de saldo suficiente');
        console.log(this.sdisponible+" < "+this.montoValue+ " - " + (+this.sdisponible<+this.montoValue))
      }else 
      if(this.montoValue==null){
        this.showAlert('El monto no puede ser cero');
      } else {
        if(this.cuentaCreditoFull==this.cuentaDebitoFull){
          this.showAlert('No puede transferir a la misma cuenta');
        } else {
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
               <Cod>16</Cod>
               <CTA_ID>`+this.cuentaDebitoFull+`</CTA_ID>
             </ModelosGet>
           </soap:Body>
         </soap:Envelope>`
      
         console.log(postData);
         //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
            this.httpClient.post("http://localhost:2898/WsModelos.asmx?op=ModelosGet",postData,httpOptions )
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
                                console.log("MODELO: ", search_array);
                                var montoMax:string = search_array.p['soap:Envelope']['0']['soap:Body']['0'].ModelosGetResponse['0'].ModelosGetResult['0'].Modelo['0'].CT_MontoMax['0'];
                                if(+montoMax >= self.montoValue){
                                  self.navCtrl.push(ConfirmaciNTransferenciaMismoTitularBFCPage,{
                                    "cuentaDebito":self.cuentaDebito,
                                    "cuentaCredito":self.cuentaCredito,
                                    "cuentaDebitoFull":self.cuentaDebitoFull,
                                    "cuentaCreditoFull":self.cuentaCreditoFull,
                                    "montoValue":self.montoValue
                                  });
                                }else{
                                  self.showAlert('El modelo no permite un monto tan alto.');
                                }
                                console.log(self.sdisponible+" < "+self.montoValue+ " - " + (+self.sdisponible<+self.montoValue))
                                
                         }catch(Error){
                          console.log("Error try 1")
                          self.showAlert('Transacción no cumple con los criterios del modelo definido');
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


