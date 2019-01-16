import { Component } from '@angular/core';
import { NavController, Toast } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PosiciNConsolidadaPage } from '../posici-nconsolidada/posici-nconsolidada';
import { DetalleDeLaCuentaPage } from '../detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../detalle-de-tarjeta/detalle-de-tarjeta';
import { WelcomePage } from '../welcome/welcome';
import { LoginProvider } from '../../providers/login/login';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,  private formBuilder: FormBuilder, private toastCtrl: ToastController) {
  }

//Mensaje al usuario al no introducir su nombre o contraseña
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Por favor, introduzca su nombre de usuario y clave para continuar',
      duration: 3000,
      position: 'botton'
  });
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });
  toast.present();
}

  goToWelcome(params){
    if (!params) params = {};
      if (!this.credentialsForm.valid) //QUITARLE EL ! A LA VALIDACIÓN PARA QUE SIRVA
      {
       this.navCtrl.setRoot(WelcomePage);
      }
      else{
     this.presentToast();
      }
  }

//Forma donde se valida el nombre y la contraseña del usuario
  credentialsForm = this.formBuilder.group({
      name: ['',Validators.required],
      password:   ['', [Validators.required, Validators.minLength(5)]]
    });

}
