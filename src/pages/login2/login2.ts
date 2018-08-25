import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { ForgetPasswordPage } from '../../pages/forget-password/forget-password';
import { TabsPage } from '../../pages/tabs/tabs';
import { IntroPage } from '../../pages/intro/intro';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { VerificationPage } from '../../pages/verification/verification';
import { HelperProvider } from '../../providers/helper/helper';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the Login2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login2',
  templateUrl: 'login2.html',
})
export class Login2Page {

  login = {field: '', password: ''};
  loginForm: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public toastCtrl: ToastController,public error_helper:HelperProvider,public _profile: ProfileProvider) {
    this.loginForm = new FormGroup({
      'field': new FormControl(this.login.field, [Validators.required]),
      'password': new FormControl(this.login.password, Validators.required)
    });
  }
  ionViewDidLoad() {    
  }
  Login(){
    this.auth.login(this.login.field,this.login.password).subscribe(
    (res) => {
      var token = JSON.parse(res['_body']);
      localStorage.setItem('token', token.token);
      this._profile.Get().subscribe(res => {
        let isActive = JSON.parse(res['_body']).user.active;
        if (isActive == 0) {
          this.auth.sendSMS(JSON.parse(res['_body']).user.id, localStorage.getItem('token')).subscribe(
            res1 => {
              this.navCtrl.setRoot(VerificationPage);
            },
            err => {
              this.presentToast(this.error_helper.Error_Handler(err));
            }
          );
        } else {
          console.log(token.token);
          this.navCtrl.setRoot(TabsPage);
        }
      }); 
    },
    (error) =>
    {
      this.presentToast(this.error_helper.Error_Handler(error));
    });
  }
  presentToast(m) {
    let toast = this.toastCtrl.create({
      message: m,
      duration: 5000,
      position: 'bottom',
      cssClass: "toast",
    });
    toast.present();
  }
  goToForgotPassword(){
    this.navCtrl.push(ForgetPasswordPage);
  }
  goToSignUp1(){
    this.navCtrl.push(IntroPage);
  }
}
