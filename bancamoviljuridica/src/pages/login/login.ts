import { Component } from '@angular/core';
import { NavController, Toast, GESTURE_REFRESHER, MenuController, AlertController } from 'ionic-angular';
import { ToastController, Events } from 'ionic-angular';
import { PosiciNConsolidadaPage } from '../posici-nconsolidada/posici-nconsolidada';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { WelcomePage } from '../welcome/welcome';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Md5} from 'ts-md5/dist/md5';
import xml2js from 'xml2js';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import * as shajs from 'sha.js';
import htmlToImage from 'html-to-image';
import { saveAs } from 'filesaver';
import { Storage } from '@ionic/storage';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public xmlItems : any;
  user:string;
  nombre:string;
  contra:string;
  contra1:string|Int32Array;
  public checkFooter:boolean =true;
  public checkFinger:boolean =false;
  rafaga:string='Ingrese nombre de usuario y contraseña'; 
  constructor(private faio: FingerprintAIO, public storage:Storage, public menuCtrl:MenuController, public events:Events, public userSession: UserSessionProvider, public navCtrl: NavController,  private formBuilder: FormBuilder, 
    private toastCtrl: ToastController,public httpClient: HttpClient, private alertCtrl: AlertController) {
    this.menuCtrl.enable(false,'Mymenu');
    this.checkFingerPrint();
    //const availableFinger = this.checkFingerPrint();
    }

    enableAuthenticatedMenu() {

      this.menuCtrl.enable(true,'Mymenu');

    }
  
  checkFingerPrint(){
    //const availableFinger = await this.faio.isAvailable()
    //console.log("finger",availableFinger);
    this.faio.isAvailable()
      .then(result => {
    //if(availableFinger === "OK"){
      this.checkFinger = true;
      this.storage.get('biometry').then((val) => {
        if(val=='saved'){
          this.storage.get('bioname').then((val) => {
            this.nombre = val;
            this.storage.get('biopass').then((val) => {
              this.contra = val;
              this.faio.show({
                clientId: 'Fingerprint-Demo', //Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
                clientSecret: 'o7aoOMYUbyxaD23oFAnJ', //Necessary for Android encrpytion of keys. Use random secret key.
                localizedReason: 'Please authenticate', //Only for iOS
                disableBackup: true
              })
              .then((result: any) => {
                  //Fingerprint/Face was successfully verified
                this.sendPostRequest();
              })
              .catch((error: any) => {
                this.rafaga = 'Error al validar la huella, ingrese los datos'
                this.nombre='';
                this.contra='';
                this.storage.clear();
                this.presentToast()
              });
            });
          });
        } else {

        }
      });
    });
  }
/* sendPostRequest() {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/xml'
     })
  };
    //var requestOptions = new RequestOptions({headers:headers});
    let postData = {
      sAF_NombreUsuarioIn: "kilate",
      //sAF_PasswordIn: "e10adc3949ba59abbe56e057f20f883e",
      //FI_IP: "10.60.102.133"
    }
    
    //[EnableCors(origins: "http://mywebclient.azurewebsites.net", headers: "*", methods: "*")]
    this.httpClient.post("http://"+this.userSession.serverIPWS+"/WsAfiliados.asmx?op=AfiliadosGetByNombre",postData,httpOptions )
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }*/

  checkBlur(){
    this.checkFooter = true;
  }

  checkFocus(){
    this.checkFooter = false;
  }

//Mensaje al usuario al no introducir su nombre o contraseña
  presentToast() {
    this.storage.clear();
    let toast = this.toastCtrl.create({
      //message: 'Por favor, introduzca su nombre de usuario y clave para continuar',
      message:this.rafaga,
      duration: 3000,
      position: 'botton'
    });
    toast.onDidDismiss(() => {

    });
    toast.present();
  }



  presentSaveFingerPrint() {
    if(this.checkFinger){
      let alert = this.alertCtrl.create({
        title: '¿Desea activar la autenticación biométrica?',
        message: '',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.navCtrl.setRoot('WelcomePage');
            }
          },
          {
            text: 'Si',
            handler: () => {
              this.faio.show({
                clientId: 'Fingerprint-Demo', //Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
                clientSecret: 'o7aoOMYUbyxaD23oFAnJ', //Necessary for Android encrpytion of keys. Use random secret key.
                localizedReason: 'Please authenticate', //Only for iOS
                disableBackup: true
              })
              .then((result: any) => {
                  //Fingerprint/Face was successfully verified
                  this.storage.set('bioname',this.nombre);
                  this.storage.set('biopass',this.contra);
                  this.storage.set('biometry','saved');
                  this.navCtrl.setRoot('WelcomePage');
                  console.log('biometry accepted and saved');
              })
              .catch((error: any) => {
                this.rafaga = 'Error al validar la huella'
                this.presentToast()
              });
            }
          }
        ]
      });
      alert.present();     
    } else {
      this.goToWelcome();
    }
  }

  presentConfirm() {
    this.storage.get('terms'+this.nombre).then((val) => {
      if(val=='accepted'){
        this.goToWelcome();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Términos y Condiciones de uso',
          message: this.userSession.TOC,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Aceptar',
              handler: () => {
                this.goToWelcome();
    
                console.log('Comfirmar clicked');
              }
            }
          ]
        });
        alert.present();
      }
    });
  }

  goToWelcome(){
      if (this.credentialsForm.valid) //QUITARLE EL ! A LA VALIDACIÓN PARA QUE SIRVA
      {
        this.enableAuthenticatedMenu();
        this.sendPostRequest();
      }
      else{
     this.presentToast();
      }
  }

//Forma donde se valida el nombre y la contraseña del usuario
  credentialsForm = this.formBuilder.group({
      nameUser: new FormControl('',Validators.compose([
        //UsernameValidator.validUsername,
        Validators.required
      ])),
      password: new FormControl('',Validators.required)
    })
  
    sendPostRequest() {
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
       var postData1 = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
       <soap:Body>
         <AfiliadosLongitudClave xmlns="http://tempuri.org/">
           <sAF_NombreUsuario>`+this.nombre+`</sAF_NombreUsuario>
         </AfiliadosLongitudClave>
       </soap:Body>
     </soap:Envelope>`
  
     console.log(postData1);
     //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
        this.httpClient.post("http://"+this.userSession.serverIPWS+"/WsAfiliados.asmx?op=AfiliadosLongitudClave",postData1,httpOptions )
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
                         console.log(search_array);
                         self.contra = self.contra.toUpperCase();
                         var lenghtContra:number = search_array.p['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLongitudClaveResponse['0'].AfiliadosLongitudClaveResult['0'];
                         console.log(lenghtContra);
                         if(lenghtContra>32){
                          console.log("sha256"+self.contra);
                          self.contra1 = shajs('sha256').update(self.contra).digest('hex')
                         } else {
                          console.log("md5");
                          self.contra1 = Md5.hashStr(self.contra);
                         }
                         console.log(self.contra1);
                         var headers = new HttpHeaders();
                         headers.append('Content-Type', 'text/xml');
                         var httpOptions = {
                           headers: new HttpHeaders({
                             'Content-Type':  'text/xml'
                          })
                       };
                         //var requestOptions = new RequestOptions({headers:headers});
                     
                         //ACÁ SE ESTABLECE LA ESTRUCTURA DE SOLICITUD SOAP VIA HTTP
                         // Esto se obtiene abriendo la vista de los web services. Para todos empleamos SOAP 1.2
                         let postData = `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                                         <soap12:Body>
                                           <AfiliadosLogin xmlns="http://tempuri.org/">
                                             <sAF_NombreUsuarioIn>`+self.nombre+`</sAF_NombreUsuarioIn>
                                             <sAF_PasswordIn>`+self.contra1+`</sAF_PasswordIn>
                                             <FI_IP>10.60.102.100</FI_IP>
                                           </AfiliadosLogin>
                                         </soap12:Body>
                                       </soap12:Envelope>`
                     //TODO: Obtener la IP del dispositivo. 
                     console.log(postData);
                     //ACÁ COMIENZA EL TRY-CATCH DEL LOGIN.
                       try{
                         //ESTA ES LA LLAMADA AL REQUEST HTTP POST: Se debe asignar la ruta definitiva. Se debe resolver el issue del CORS
                         self.httpClient.post("http://"+self.userSession.serverIPWS+"/WsAfiliados.asmx?op=AfiliadosLogin",postData,httpOptions )
                         .subscribe(data => {
                           console.log('Data: '+data['_body']);
                          }, error => {
                            try{
                              //IONIC no funciona con contextos globales, como acá estamos trabajando dentro de un 
                              //método aparte, se sale del contexto del TRY-CATCH anterior, por lo que se debe colocar
                              //otro try-catch dentro de este nuevo contexto
                   
                              //Estas líneas parsean la respuesta JSON que devuelve el request.
                                 console.log('Error: '+JSON.stringify(error));
                                 var str = JSON.stringify(error);
                                 console.log("stingified: ", str);
                   
                               //Se aloja en la variable str, el texto completo de la respuesta
                                 var search_array = JSON.parse(str);
                                 //Se convierte la respuesta string a JSON, y se aloja en search_array
                                 console.log("result: ", search_array.error.text);
                                 //La respuesta XML del web service está en el campo text, del campo error, del json search_array
                                 
                                 //Este search_array se convierte en un documento XML para que pueda procesarse,
                                 //se convierte de string a XML DOC
                                 var parser = new DOMParser();
                                 var doc = parser.parseFromString(search_array.error.text, "application/xml");
                                 console.log(doc);
                                 
                                 //DOC aloja un documento XML, el cual será envuelto en un wrap html, para poder procesarlo
                                 //con el Parser de la librería xml2js de Typings
                                 var el = doc.createElement("p");
                                 el.appendChild(doc.getElementsByTagName("soap:Envelope").item(0));
                                 
                                 //el, es una variable que aloja el wrap HTML que contiene el DOC en XML
                                 var tmp = doc.createElement("div");
                                 tmp.appendChild(el);
                                 console.log(tmp.innerHTML);
                   
                                 //Se define el parser de xml2js
                                 var parseString = xml2js.parseString;
                   
                                 //xml será una variable que contendrá el documento HTML interno que contiene el DOC XML
                                 var xml = tmp.innerHTML;
                                 var texto:string = "";
                                 var self2 = self;
                                 
                                 //Se utiliza el Parser de xml2js, el cual es una funcion que recibe el doc XML, y una funcion que definirá
                                 //el procesamiento de ese json, alojado ahora en el JSONObject result.
                                 //Como IONIC no trabaja con contextos globales, para poder acceder a los métodos de navegación y las variables
                                 //globales, de manera que se puedan almacenar los datos de la ráfaga, se agrega el campo "self" al constructor, 
                                 //en el cual se está pasando el contexto this.
                                 parseString(xml, self2, function (err, result) {
                                     try{
                                       //Acá se abrió otro contexto, por lo que se crea otro bloque Try-catch
                                       console.dir(result);
                                       
                                       try{
                                         //Prueba Mensaje de Sesion
                                       self2.rafaga= result['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].SqlException['0'].NumeroError['0'];
                                       console.dir(self2.rafaga);
                                       //self.presentToast();


                                       }
                                      catch(Error){
                                        if(self2.rafaga == "1014")
                                      {

                                        self2.rafaga ="Usuario Bloqueado por intentos fallidos";
                                        self2.presentToast();
                                      }
                                        else if(self2.rafaga == "1001")
                                      {
                                        self2.rafaga ="Usuario/contraseña invalida intente de nuevo";
                                        self2.presentToast();
                                      }
                                      else if(self2.rafaga == "1070")
                                      {
                                        self2.rafaga ="Usuario ya tiene una sesión Activa";
                                        self2.presentToast();
                                      }

                                        
                                      }
                                       

                                       //En estas tres lineas se sigue el mismo procedimiento anterior, en el que se parsea el result
                                       //en json, en la variable search_array
                                       var str = JSON.stringify(result);
                                       console.log("stringified: ", result);
                                       var search_array = JSON.parse(str);
                   
                                       //Acá se hace el parse como tal: Para acceder a las rutas del json,
                                       //se toma la respuesta del json que se obtiene cuando se hace debug en Chrome,
                                       //accedes al campo que necesitas, click derecho y entras a la ruta del json,
                                       //puedes acceder ahora a los valores colocando la ruta seguida del search_array.
                                       console.log("result: ", search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']);
                                      
                                       //Acá se guarda el nombre del usuario autorizado en el provider de variables globales userSession
                                       self2.userSession.CO_NOMBRES= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['CO_NOMBRES']['0'];
                                       self2.userSession.AF_Rif= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_Rif']['0'];
                                       self2.userSession.AF_Codcliente= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_Codcliente']['0'];
                                       self2.userSession.AF_Id= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_Id']['0'];
                                       self2.userSession.AF_IdPrincipal= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_IdPrincipal']['0'];
                                       self2.userSession.AF_CLAsig= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_CLAsig']['0'];
                                       self2.userSession.AF_Cedula= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_Cedula']['0'];
                                       self2.userSession.AF_Clave= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_Clave']['0'];
                                       self2.userSession.AF_CodCliente1= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_CodCliente1']['0'];
                                       self2.userSession.AF_CodPrincipal= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_CodPrincipal']['0'];
                                       self2.userSession.AF_DiasPassword= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_DiasPassword']['0'];
                                       self2.userSession.AF_Especial= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_Especial']['0'];
                                       self2.userSession.AF_FecConst= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_FecConst']['0'];
                                       self2.userSession.AF_FechaPassword= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_FechaPassword']['0'];
                                       self2.userSession.CO_Email= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['CO_Email']['0'];
                                       self2.userSession.AF_NombreUsuario= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_NombreUsuario']['0'];
 
                                    /* public AF_Id:string = "";
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
                                       public TI_Id:string = "";    */  
                   
                                       try {
                                         //Esta es la validación para saber si es usuario admin:
                                         //Se consulta el campo CO_NombreADM, que sólo viene en la ráfaga de respuesta cuando 
                                         //el usuario que hizo login es un usuario Administrador.
                                         var admin:string = search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_Tipo']['0'];
                                         console.log(admin);
                                         if (admin=="1"){
                                          //Si el código no explota en la línea anterior, significa que trajo el campo, por lo que se presenta
                                          //el mensaje de "El usuario no es Autorizado"
                                          self2.rafaga ="Solo Usuario Autorizado de Tipo Empresa"
                                          self2.presentToast();
                                          
                                          //Se cierra el try, nunca llega al catch, por lo tanto, no hace login.
                                         }else {
                                           throw error;
                                         }
                                       } catch (error) {
                                         //ACÁ YA SE VALIDÓ EL USER, SE CONFIRMÓ QUE ES AUTORIZADO JURÍDICO Y SE PROCEDE A NAVEGAR
                                         
                                         //Ahora se procede a traer el menú dinámico:
                                         headers = new HttpHeaders();
                                         headers.append('Content-Type', 'text/xml');
                                         httpOptions = {
                                             headers: new HttpHeaders({
                                               'Content-Type':  'text/xml'
                                           })
                                         };
                                        
                                         //Se hace la solicitud HTTP Para traer el menú con las opciones según el usuario que acaba de iniciar sesión
                                         //Traeremos el id, de la ráfaga anterior (La respuesta, del login)
                                         postData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                                         <soap:Body>
                                           <MenuDinamicoJuridico xmlns="http://tempuri.org/">
                                             <IsAdmin>false</IsAdmin>
                                             <AF_Id>`+self2.userSession.AF_Id+`</AF_Id>
                                             <Grupo>N</Grupo>
                                           </MenuDinamicoJuridico>
                                         </soap:Body>
                                       </soap:Envelope>`
                                       //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
                                         self.httpClient.post("http://"+self.userSession.serverIPWS+"/WsMenuDinamico.asmx?op=MenuDinamicoJuridico",postData,httpOptions )
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
                                                 var self2 = self;
                                                 parseString(xml, self2, function (err, result) {
                                                     try{
                                                           console.dir(result);
                                                           var str = JSON.stringify(result);
                                                           console.log("stringified: ", result);
                                                           var search_array = JSON.parse(str);
                                                           console.log("result: ", search_array);
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
                                                                   self2.userSession.validarPC=true;
                                                                 } else if(check=="Transferencias"){
                                                                   self2.userSession.validarTR=true;
                                                                 } else if(check=="Tarjetas de Crédito"){
                                                                   self2.userSession.validarTDC=true;
                                                                 } else if(check=="Autorización de Transacciones / Lotes"){
                                                                   self2.userSession.validarAPR=true;
                                                                 }
                                                           });
                                                           }catch(Error){}
                                                           //Si en este punto no han ocurrido errores, procedemos a actualizar
                                                           //las variables del menú haciendo un llamado Events (Ver documentación Menú Dinámico)
                                                           self2.events.publish('session:created', true);
                   
                                                           self2.storage.set('terms'+self2.nombre, 'accepted');
                                                           
                                                           if(self2.checkFinger){
                                                            self2.storage.get('biometry').then((val) => {
                                                              if(val=='saved'){
                                                                self2.navCtrl.setRoot('WelcomePage');
                                                              } else {
                                                               self2.presentSaveFingerPrint();
                                                              }
                                                             });
                                                           } else {
//CAMBIOS MANEJO DE SESION--------------------------------------------------------------------------
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
                                                               <CreateSession xmlns="http://tempuri.org/">
                                                                 <AF_Id>`+self2.userSession.AF_Id+`</AF_Id>
                                                               </CreateSession>
                                                             </soap:Body>
                                                           </soap:Envelope>`
                                                        
                                                           console.log(postData);
                                                           //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
                                                              self2.httpClient.post("http://"+self2.userSession.serverIPApp+"/WsMovil.asmx?op=CreateSession",postData,httpOptions )
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
                                                                     var self = self2;
                                                                     parseString(xml, self, function (err, result) {
                                                                         try{
                                                                               console.dir(result);
                                                                               var str = JSON.stringify(result);
                                                                               console.log("stringified: ", result);
                                                                               var search_array = JSON.parse(str);
                                                                               console.log("User Session: ", search_array);
                                                                               self2.userSession.sessionId = search_array.p['soap:Envelope']['0']['soap:Body']['0'].CreateSessionResponse['0'].CreateSessionResult['0'].Sesion['0'];
       
//METODO QUE USA SESION ID-*--------------------------------------------------------------------------------------
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
                                                                 try{
                                                                   //Se hace la solicitud HTTP Para traer el menú con las opciones según el usuario que acaba de iniciar sesión
                                                                   //Traeremos el id, de la ráfaga anterior (La respuesta, del login)
                                                                   var postData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                                                                   <soap:Body>
                                                                     <GetSession xmlns="http://tempuri.org/">
                                                                       <sesion>`+self2.userSession.sessionId+`</sesion>
                                                                     </GetSession>
                                                                   </soap:Body>
                                                                 </soap:Envelope>`
                                                                 
                                                                  console.log(postData);
                                                                  //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
                                                                    self2.httpClient.post("http://"+self2.userSession.serverIPApp+"/WsMovil.asmx?op=GetSession",postData,httpOptions )
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
                                                                           var self = self2;

                                                               

                                                                           parseString(xml, self, function (err, result) {
                                                                               try{
                                                                                     console.dir(result);
                                                                                     var str = JSON.stringify(result);
                                                                                     console.log("stringified: ", result);
                                                                                     var search_array = JSON.parse(str);
                                                                                     console.log("sesion respuesta: ", search_array);
                                                                                     self2.navCtrl.setRoot('WelcomePage');
                                                                                 }catch(Error){
                                                                                  console.log("Error try 1")
                                                                                  //self.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                                                                                  //self.presentToast();
                                                                                 }
                                                                               });
                                                                    });

                                                                  }catch(Error){
                                                                    console.log("Error try 10")
                                                                    self.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente 10"
                                                                    self.presentToast();
                                                                  }

                                                                  } catch (error) {
                                                                    console.log("Error try 2")
                                                                  }
//METODO QUE USA SESION ID  ----------------------------------------------------------------------------------------------------
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

//CAMBIOS MANEJO DE SESION--------------------------------------------------------------------------
                                                            
                                                           }
                                                           

                                                           //Navegamos
                                                       }catch(Error){
                                                         self2.rafaga ="Usuario/contraseña invalida intente de nuevo"
                                                         self2.presentToast();
                                                       }
                                                     });
                                          });
                   
                   
                                       }
                                     }catch(Error){
                                       //Acá se pondrán los mensajes correspondientes a cada bloque de try-catch.
                                       //Se podrán colocar más validaciones para los diferentes mensajes.
                                       if(self2.rafaga == "1001")
                                      {
                                        self2.rafaga ="Usuario/contraseña invalida intente de nuevo"
                                        self2.presentToast();
                                      }
                                          
                                        else if(self2.rafaga == "1070")
                                        {

                                          self2.rafaga ="Usuario ya tiene una sesión Activa"
                                          self2.presentToast();
                                        }
                                        else if(self2.rafaga == "1014")
                                        {

                                          self2.rafaga ="Usuario Bloqueado por intentos fallidos"
                                          self2.presentToast();
                                        }

                                     }
                                 });  
                               }catch(Error){ 
                                self.rafaga ="Usuario o Contraseña incorrecta, intente nuevamente"
                                self.presentToast();
                               }
                         });
                       }
                       catch(Error)
                       {
                         //Acá termina el try-catch del login, Sólo muestra esto cuando
                         //el server no responde (Solo explota si falla la solicitud HTTP)
                         self.rafaga ="Error iniciando sesión, intente nuevamente"
                         self.presentToast();
                       } 
                     }catch(Error){
                      console.log(Error)
                     }
                   });
        });
        
      } catch (error) {
        console.log("Error try 2")
      }

    }


    //import htmlToImage from 'html-to-image';
    //import { saveAs } from 'filesaver';
  

     /*
     this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
      }).catch(() => {
        // Sharing via email is not possible
      });
      
      // Share via email
      this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });*/
    
}