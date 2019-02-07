import { Component } from '@angular/core';
import { NavController, Toast, GESTURE_REFRESHER, MenuController } from 'ionic-angular';
import { ToastController, Events } from 'ionic-angular';
import { PosiciNConsolidadaPage } from '../posici-nconsolidada/posici-nconsolidada';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { WelcomePage } from '../welcome/welcome';
import { LoginProvider } from '../../providers/login/login';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Md5} from 'ts-md5/dist/md5';
import xml2js from 'xml2js';
import { UserSessionProvider } from '../../providers/user-session/user-session';

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
  rafaga:string='Ingrese nombre de usuario y contraseña'; 
  constructor(public menu:MenuController, public events:Events, public userSession: UserSessionProvider, public navCtrl: NavController,  private formBuilder: FormBuilder, 
    private toastCtrl: ToastController, public LoginProvider: LoginProvider,public httpClient: HttpClient) {
    this.menu.enable(false,'menu');
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
    this.httpClient.post("http://localhost:2898/WsAfiliados.asmx?op=AfiliadosGetByNombre",postData,httpOptions )
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }*/

  

//Mensaje al usuario al no introducir su nombre o contraseña
  presentToast() {
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

  goToWelcome(params){
    if (!params) params = {};
      if (this.credentialsForm.valid) //QUITARLE EL ! A LA VALIDACIÓN PARA QUE SIRVA
      {
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
      this.contra1 = Md5.hashStr(this.contra);
      console.log(this.contra1);
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
                          <sAF_NombreUsuarioIn>`+this.nombre+`</sAF_NombreUsuarioIn>
                          <sAF_PasswordIn>`+this.contra1+`</sAF_PasswordIn>
                          <FI_IP>10.60.102.100</FI_IP>
                        </AfiliadosLogin>
                      </soap12:Body>
                    </soap12:Envelope>`
  //TODO: Obtener la IP del dispositivo.
      
  //ACÁ COMIENZA EL TRY-CATCH DEL LOGIN.
    try{
      //ESTA ES LA LLAMADA AL REQUEST HTTP POST: Se debe asignar la ruta definitiva. Se debe resolver el issue del CORS
      this.httpClient.post("http://localhost:2898/WsAfiliados.asmx?op=AfiliadosLogin",postData,httpOptions )
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
              var self = this;
              
              //Se utiliza el Parser de xml2js, el cual es una funcion que recibe el doc XML, y una funcion que definirá
              //el procesamiento de ese json, alojado ahora en el JSONObject result.
              //Como IONIC no trabaja con contextos globales, para poder acceder a los métodos de navegación y las variables
              //globales, de manera que se puedan almacenar los datos de la ráfaga, se agrega el campo "self" al constructor, 
              //en el cual se está pasando el contexto this.
              parseString(xml, self, function (err, result) {
                  try{
                    //Acá se abrió otro contexto, por lo que se crea otro bloque Try-catch
                    console.dir(result);
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
                    console.log("1");
                    self.userSession.CO_NOMBRES= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['CO_NOMBRES']['0'];
                    console.log("2");
                    self.userSession.AF_Rif= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_Rif']['0'];
                    console.log("3");
                    self.userSession.AF_Codcliente= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_Codcliente']['0'];
                    console.log("4");
                    self.userSession.AF_Id= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_Id']['0'];
                    console.log("5");
                    self.userSession.AF_IdPrincipal= search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['AF_IdPrincipal']['0'];
                    console.log("6");

                    console.log("Guardado: ", self.userSession.CO_NOMBRES);
                    console.log("Guardado: ", self.userSession.AF_Rif);
                    console.log("Guardado: ", self.userSession.AF_Codcliente);
                    console.log("Guardado: ", self.userSession.AF_Id);
                    console.log("Guardado: ", self.userSession.AF_IdPrincipal);
                    try {
                      //Esta es la validación para saber si es usuario admin:
                      //Se consulta el campo CO_NombreADM, que sólo viene en la ráfaga de respuesta cuando 
                      //el usuario que hizo login es un usuario Administrador.
                      var admin:string = search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['CO_NombresADM']['0'];
                      
                      //Si el código no explota en la línea anterior, significa que trajo el campo, por lo que se presenta
                      //el mensaje de "El usuario no es Autorizado"
                      self.rafaga ="El usuario no es Autorizado"
                      self.presentToast();
                      //Se cierra el try, nunca llega al catch, por lo tanto, no hace login.
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
                          <AF_Id>`+self.userSession.AF_Id+`</AF_Id>
                          <Grupo></Grupo>
                        </MenuDinamicoJuridico>
                      </soap:Body>
                    </soap:Envelope>`
                    //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
                      self.httpClient.post("http://localhost:2898/WsMenuDinamico.asmx?op=MenuDinamicoJuridico",postData,httpOptions )
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

                                        //Navegamos
                                        self2.navCtrl.setRoot(WelcomePage);
                                    }catch(Error){
                                      self2.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                                      self2.presentToast();
                                    }
                                  });
                       });


                    }
                  }catch(Error){
                    //Acá se pondrán los mensajes correspondientes a cada bloque de try-catch.
                    //Se podrán colocar más validaciones para los diferentes mensajes.
                    this.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                    this.presentToast();
                  }
              });  
            }catch(Error){ 
              this.rafaga ="Usuario o Contraseña incorrecta, intente nuevamente"
              this.presentToast();
            }
      });
    }
    catch(Error)
    {
      //Acá termina el try-catch del login, Sólo muestra esto cuando
      //el server no responde (Solo explota si falla la solicitud HTTP)
      this.rafaga ="Error iniciando sesión, intente nuevamente"
      this.presentToast();
    } 

    }

   /* parseXML(data)
        {
           return new Promise(resolve =>
           {
              var k,
                  arr    = [],
                  parser = new xml2js.Parser(
                  {
                     trim: true,
                     explicitArray: true
                  });
     
              parser.parseString(data, function (err, result)
              {
                 console.log(JSON.stringify(err));
                 var obj = result.comics;
                 for(k in obj.publication)
                 {
                    var item = obj.publication[k];
                    arr.push({
                       id           : item.id[0],
                       title        : item.title[0],
                       publisher : item.publisher[0],
                       genre        : item.genre[0]
                    });
                 }
     
                 resolve(arr);
              });
           });
        }*/
}

/*
POST /WsAfiliados.asmx HTTP/1.1
Host: localhost
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://tempuri.org/AfiliadosGetByNombre"
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <AfiliadosGetByNombre xmlns="http://tempuri.org/">
      <sAF_NombreUsuario>string</sAF_NombreUsuario>
    </AfiliadosGetByNombre>
  </soap:Body>
</soap:Envelope>*/