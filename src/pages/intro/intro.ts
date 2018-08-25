import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Login1Page } from '../../pages/login1/login1';
import { Login2Page } from '../../pages/login2/login2';
// import { TabsPage } from '../../pages/tabs/tabs';
/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    
  }

  ionViewDidLoad() {
    this.menu.enable(false, 'rightMenu');
    console.log('ionViewDidLoad IntroPage');
  }

  goToSignUp1()
  {
    this.navCtrl.push( Login1Page );
  }
  // goToSignUp2()
  // {
  //   this.navCtrl.push( Login3Page );
  // }
  goToLogin()
  {
    this.navCtrl.push( Login2Page );
  }

}
