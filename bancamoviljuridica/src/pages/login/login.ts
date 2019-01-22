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

  constructor(public navCtrl: NavController,  private formBuilder: FormBuilder, 
    private toastCtrl: ToastController, public LoginProvider: LoginProvider,public httpClient: HttpClient ) {

      this.sendPostRequest();
  }



  sendPostRequest() {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/xml');
    headers.append('Accept', 'application/xml');
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type':  'application/xml',
      //'Authorization': 'my-auth-token'
     })
  };
    //var requestOptions = new RequestOptions({headers:headers});

    let postData = {
      sAF_NombreUsuarioIn: "kilate",
      //sAF_PasswordIn: "e10adc3949ba59abbe56e057f20f883e",
      //FI_IP: "10.60.102.133"
    }

    

    this.httpClient.post("http://localhost:2898/WsAfiliados.asmx?op=AfiliadosGetByNombre",postData,httpOptions )
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }


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

       this.navCtrl.setRoot(WelcomePage);
      }
      else{
     this.presentToast();
      }
  }


//Forma donde se valida el nombre y la contraseña del usuario
  credentialsForm = this.formBuilder.group({
      name: new FormControl('',Validators.compose([
        //UsernameValidator.validUsername,
        Validators.required
      ])),
      password: new FormControl('',Validators.required)
    })
  
}
