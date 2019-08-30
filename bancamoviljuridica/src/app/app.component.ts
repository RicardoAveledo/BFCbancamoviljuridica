import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { UserSessionProvider } from '../providers/user-session/user-session';
import { Events } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;
  public posicionConsolidada:boolean = true;
  public transferencias:boolean = true;
  public tdc:boolean = true;
  public ar:boolean = true;
  public validarPC:boolean=true;
  public validarTR:boolean=true;
  public validarTDC:boolean=true;
  public validarAPR:boolean=true;

  constructor(public platform: Platform, public userSession:UserSessionProvider, public events:Events, 
    statusBar: StatusBar, splashScreen: SplashScreen, private toastCtrl: ToastController, public httpClient: HttpClient) {
      this.httpClient = httpClient;
    this.handleSplashScreen()
    events.subscribe('session:created', (validador) => {
      this.validarPC = this.userSession.validarPC;
      this.validarTR = this.userSession.validarTR;
      this.validarTDC = this.userSession.validarTDC;
      this.validarAPR = this.userSession.validarAPR;
    });
    events.publish('session:created', true);
    //this.userSession.validar = this.validar;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // hide #splash-screen when app is ready
  async handleSplashScreen(): Promise<void> {
    try {
      // wait for App to finish loading
      await this.platform.ready()
    } catch (error) {
      console.error('Platform initialization bug')
    }
    
    // Any operation that shoud be performed BEFORE showing user UI,
    // in a real App that may be cookie based authentication check e.g.
    // await this.authProvider.authenticate(...)
    
    // fade out and remove the #splash-screen
    const splash = document.getElementById('splash-screen')
    splash.style.opacity = '0'
    setTimeout(() => { splash.remove() }, 300)
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      //message: 'Por favor, introduzca su nombre de usuario y clave para continuar',
      message:'No posee privilegios creados para esta transacción, Contacte al Usuario Administrador',
      duration: 3000,
      position: 'botton'
    });
    toast.onDidDismiss(() => {

    });
    toast.present();
  }

  opcionBloqueada(){
    this.presentToast();
  }

  goToPosiciNConsolidada(params){
    if (!params) params = {};
    this.navCtrl.setRoot('PosiciNConsolidadaPage');
    if (this.posicionConsolidada){
      this.posicionConsolidada = !this.posicionConsolidada;
    }
    this.transferencias = true;
    this.ar = true;
    this.tdc = true;
  }
  goToTransferencias(params){
    if (!params) params = {};
    this.navCtrl.setRoot('TransferenciasPage');
    if (this.transferencias){
      this.transferencias = !this.transferencias;
    }
    this.posicionConsolidada = true;
    this.tdc = true;
    this.ar = true;
  }

  goToOperacionesDeTDC(params){
    if (!params) params = {};
    this.navCtrl.setRoot('OperacionesDeTDCPage');
    if(this.tdc){
      this.tdc = !this.tdc;
    }
    this.ar = true;
    this.transferencias = true;
    this.posicionConsolidada = true;
  }

  goToAprobaciNRechazo(params){
    if (!params) params = {};
    this.navCtrl.setRoot('AprobacionRechazoPrincipalPage');
    if(this.ar){
      this.ar = !this.ar;
    }
    this.tdc = true;
    this.transferencias = true;
    this.posicionConsolidada = true;
  }

  goToDetalleDeLaCuenta(params){
    if (!params) params = {};
    this.navCtrl.setRoot('DetalleDeLaCuentaPage');
  }goToDetalleDeTarjeta(params){
    if (!params) params = {};
    this.navCtrl.setRoot('DetalleDeTarjetaPage');
  }
  goToTransferenciasMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.setRoot('TransferenciasMismoTitularBFCPage');
  }goToConfirmaciNTransferenciaMismoTitularBFC(params){
    if (!params) params = {};
    this.navCtrl.setRoot('ConfirmaciNTransferenciaMismoTitularBFCPage');
  }goToTransferenciaMismoTitularBFCRecibo(params){
    if (!params) params = {};
    this.navCtrl.setRoot('TransferenciaMismoTitularBFCReciboPage');
  }goToTransferenciaMismoTitularOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.setRoot('TransferenciaMismoTitularOtrosBancosPage');
  }goToTransferenciaTercerosBFC(params){
    if (!params) params = {};
    this.navCtrl.setRoot('TransferenciaTercerosBFCPage');
  }goToTransferenciasTercerosDetalle(params){
    if (!params) params = {};
    this.navCtrl.setRoot('TransferenciasTercerosDetallePage');
  }goToTransferenciaTercerosOtrosBancos(params){
    if (!params) params = {};
    this.navCtrl.setRoot('TransferenciaTercerosOtrosBancosPage');
  }goToTransferenciaTercerosOtrosBancosRecibo(params){
    if (!params) params = {};
    this.navCtrl.setRoot('TransferenciaTercerosOtrosBancosReciboPage');
  }goToSalir(params){
    this.userSession.validarAPR=false;
    this.userSession.validarPC =false;
    this.userSession.validarTDC=false;
    this.userSession.validarTR =false;
    this.userSession.cuentas = [];
    this.userSession.tdc = [];
    this.validarPC  = true;
    this.validarTR  = true;
    this.validarTDC = true;
    this.validarAPR = true;
    this.events.publish('session:created', true); 
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
         <CerrarSession xmlns="http://tempuri.org/">
           <sesion>`+this.userSession.sessionId+`</sesion>
         </CerrarSession>
       </soap:Body>
     </soap:Envelope>`
  
     console.log(postData);
     //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
        this.httpClient.post("http://"+this.userSession.serverIPApp+"/WsMovil.asmx?op=CerrarSession",postData,httpOptions )
       .subscribe(data => {
        // console.log('Data: '+data['_body']); 
        }, error => {

        });
      } catch (error) {
        console.log("Error try 2")
      } 
      
      this.navCtrl.setRoot(LoginPage);   

  }goToWelcome(params){
    if (!params) params = {};
    this.navCtrl.setRoot('WelcomePage');
  }
}
