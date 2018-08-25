import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroPage } from '../../pages/intro/intro';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular';
import { ResetpasswordPage } from '../../pages/resetpassword/resetpassword';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  field;
  forgetPassForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _auth: AuthProvider, public toastCtrl: ToastController,public error_helper:HelperProvider) {
    this.forgetPassForm = new FormGroup({
      'field': new FormControl(this.field, [Validators.required])
    });
  }

  PhoneCheck(){
  }

  Submit()
  {
      this._auth.forgetPassword(this.field).subscribe(
        req => {
            this.navCtrl.push(ResetpasswordPage, {field: this.field});
            console.log(req)
        },
        error => {
          this.presentToast(this.error_helper.Error_Handler(error));
        }
      );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
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

  goToSignUp1()
  {
    this.navCtrl.push(IntroPage);
  }
  
}
