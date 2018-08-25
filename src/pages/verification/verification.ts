import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperProvider } from '../../providers/helper/helper';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { Pipe, PipeTransform } from '@angular/core';
import{ ChangePhoneNumberPage } from '../../pages/change-phone-number/change-phone-number';
import { ProfileProvider } from '../../providers/profile/profile';
/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// import { HelperProvider } from '../../providers/helper/helper';
// ,public error_helper:HelperProvider
// this.presentToast(this.error_helper.Error_Handler(error));
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {

  phoneNumber;
  userId;
  filed;
  otp :number;
  phoneForm : FormGroup;
  countDown;
  counter = 300;
  tick = 1000;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public toastCtrl: ToastController ,public error_helper:HelperProvider,public _profile: ProfileProvider) {
    this.phoneForm = new FormGroup({
      'otp': new FormControl(this.otp, [Validators.required]),
    });
  }

  ResendCode()
  {   
      this.auth.sendSMS(this.userId, localStorage.getItem('token')).subscribe(
      (res1) =>{
        this.counter = 300;
        this.countDownF();
        this.presentToast(' لقد تم ارسال الرقم الي هاتفك  ');
      },
      (err1) =>{
        this.presentToast(this.error_helper.Error_Handler(err1));
      });
  }

  Submit(){
    this.auth.verifySMS(this.userId, this.otp).subscribe(
    res => {
      var token = JSON.parse(res['_body']);
      localStorage.setItem('token', token.token)
      console.log(token.token);
      this.navCtrl.setRoot(TabsPage);
    },error => {
      this.presentToast(this.error_helper.Error_Handler(error));
    });
}

  changePhoneNumer(){
    this.navCtrl.push(ChangePhoneNumberPage,{phoneNumber: this.phoneNumber, id: this.userId});
  }
  countDownF(){
    this.countDown = Observable.timer(0, this.tick)
    .take(this.counter)
    .map(() => {
      
      console.log(this.counter);
      return  --this.counter;
    })
  }
  
  ionViewDidLoad(){
   this.countDownF();
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

  ionViewWillEnter(){
    this._profile.Get().subscribe(res => {
      this.phoneNumber = JSON.parse(res['_body']).user.phone;
      this.userId = JSON.parse(res['_body']).user.id;
    }, err =>{
      this.presentToast(this.error_helper.Error_Handler(err));
    });
  }

}


@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }

}