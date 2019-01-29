import { Component } from '@angular/core';
import { NavController, Toast, GESTURE_REFRESHER } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
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
  constructor(public userSession: UserSessionProvider, public navCtrl: NavController,  private formBuilder: FormBuilder, 
    private toastCtrl: ToastController, public LoginProvider: LoginProvider,public httpClient: HttpClient ) {
    
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
    console.log(this.user);
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
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'text/xml'
       })
    };
      //var requestOptions = new RequestOptions({headers:headers});
  
      let postData = `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <AfiliadosLogin xmlns="http://tempuri.org/">
          <sAF_NombreUsuarioIn>`+this.nombre+`</sAF_NombreUsuarioIn>
          <sAF_PasswordIn>`+this.contra1+`</sAF_PasswordIn>
          <FI_IP>10.60.102.100</FI_IP>
        </AfiliadosLogin>
      </soap12:Body>
    </soap12:Envelope>`
  
      
    try{
      this.httpClient.post("http://localhost:2898/WsAfiliados.asmx?op=AfiliadosGetByNombre",postData,httpOptions )
      .subscribe(data => {
        console.log('Data: '+data['_body']);
       }, error => {
         try{
              console.log('Error: '+JSON.stringify(error));
              var str = JSON.stringify(error);
              console.log("stingified: ", str);

              var search_array = JSON.parse(str);
              //var result = search_array[1].error;
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
                    //var result = search_array[1].error;
                    //console.log("result: ", search_array.p.Envelope);
                    console.log("result: ", search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']);
                    self.userSession.CO_NombresADM = search_array['p']['soap:Envelope']['0']['soap:Body']['0'].AfiliadosLoginResponse['0'].AfiliadosLoginResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table['0']['CO_NombresADM']['0'];
                    console.log("Guardado: ", self.userSession.CO_NombresADM);
                    self.navCtrl.setRoot(WelcomePage);
                  }catch(Error){
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
