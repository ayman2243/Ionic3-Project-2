import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../../pages/tabs/tabs';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  field;
  otp;
  resetData = { user_id: '', otp: '', password: '', password_confirmation: '' }
  resetForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _auth: AuthProvider,public toastCtrl: ToastController,public error_helper:HelperProvider) {
    this.field = this.navParams.get('field');
    console.log(this.field);
    this._auth.checkEmailOrPhone(this.field).subscribe(
      res => {
        this.resetData.user_id = JSON.parse(res['_body']).user.id;
      },error=>{
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    );
    this.resetForm = new FormGroup({
      'otp': new FormControl(this.resetData.otp, [Validators.required]),
      'password': new FormControl(this.resetData.password, [Validators.required]),
      'password_confirmation': new FormControl(this.resetData.password_confirmation, [Validators.required])
    });
  }

  validPassword()
  {
    if( this.resetData.password != this.resetData.password_confirmation)
    {     
      this.resetForm.controls.password_confirmation.setErrors({'invalid': 'invalid'});
    }
  }
  
  Submit()
  {
    this. _auth.resetPassword(this.resetData).subscribe(
      res => 
      {
        var token = JSON.parse(res['_body']);
        localStorage.setItem('token', token.token)
        console.log(token.token);
        this.navCtrl.setRoot(TabsPage);
      },
      error =>
      {
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    )
    console.log(this.resetData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }
  presentToast(ms) {
    let toast = this.toastCtrl.create({
      message: ms,
      duration: 3000,
      position: 'bottom',
      cssClass: "toast",
    });
    toast.present();
  } 
}
