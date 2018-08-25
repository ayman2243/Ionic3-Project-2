import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  data = { old_password: '', password: '', password_confirmation:''};
  DataForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public _auth: AuthProvider, private toastCtrl: ToastController,public error_helper:HelperProvider) {
    this.DataForm = new FormGroup({
      'old_password': new FormControl(this.data.old_password, Validators.required),
      'password': new FormControl(this.data.password, Validators.required),
      'password_confirmation': new FormControl(this.data.password_confirmation, Validators.required)
    });
  }

  validPassword(){
  }

  Submit()
  {
    this._auth.changePassword(this.data).subscribe(
      res =>
      {
        console.log(res);
        this.navCtrl.pop();
      },
      error => this.presentToast(this.error_helper.Error_Handler(error))
      
    );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  presentToast(mes) {
    let toast = this.toastCtrl.create({
      message: mes,
      duration: 3000,
      position: 'bottom',
      cssClass: "toast",
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
