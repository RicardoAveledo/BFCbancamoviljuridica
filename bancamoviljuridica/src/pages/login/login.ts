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
import xml2js from 'xml2js';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public xmlItems : any;
  user:string;
  nombre:string;
  contra:string;

  constructor(public navCtrl: NavController,  private formBuilder: FormBuilder, 
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
      message:this.user,
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
        this.navCtrl.setRoot(WelcomePage);
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
          <sAF_PasswordIn>`+this.contra+`</sAF_PasswordIn>
          <FI_IP>10.60.102.100</FI_IP>
        </AfiliadosLogin>
      </soap12:Body>
    </soap12:Envelope>`
  
      
      //[EnableCors(origins: "http://mywebclient.azurewebsites.net", headers: "*", methods: "*")]
      this.httpClient.post("http://localhost:2898/WsAfiliados.asmx?op=AfiliadosGetByNombre",postData,httpOptions )
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });
    }

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