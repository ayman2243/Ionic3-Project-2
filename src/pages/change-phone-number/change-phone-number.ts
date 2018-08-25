import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileProvider } from '../../providers/profile/profile';
import { HelperProvider } from '../../providers/helper/helper';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the ChangePhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-phone-number',
  templateUrl: 'change-phone-number.html',
})
export class ChangePhoneNumberPage {
  phoneNumber;
  changePhoneForm : FormGroup;
  userId;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _profile: ProfileProvider,public error_helper:HelperProvider, public toastCtrl: ToastController, public auth: AuthProvider) {
    this.phoneNumber = this.navParams.get('phoneNumber');
    this.userId = this.navParams.get('id');
    this.changePhoneForm = new FormGroup({
      'phoneNumber': new FormControl(this.phoneNumber, [Validators.required]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePhoneNumberPage');
  }

  Submit(){
    this._profile.updatePhone(this.phoneNumber).subscribe(res =>{
      this.auth.sendSMS(this.userId, localStorage.getItem('token')).subscribe(
        (res1) =>{
          console.log('code sent to ' + this.phoneNumber);
        },
        (err1) =>{
          this.presentToast(this.error_helper.Error_Handler(err1));
        });
      this.navCtrl.pop();
    }, err => {
      this.presentToast(this.error_helper.Error_Handler(err));
    })
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
