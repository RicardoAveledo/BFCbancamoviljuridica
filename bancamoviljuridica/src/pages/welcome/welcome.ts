import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserSessionProvider } from '../../providers/user-session/user-session';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'WelcomePage',
  segment: 'WelcomePage'
})
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public userSession:UserSessionProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.userSession.reloadAccountData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
