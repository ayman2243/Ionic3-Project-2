import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Login2Page } from '../../pages/login2/login2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SingnupmapPage } from '../../pages/singnupmap/singnupmap';
import { AuthProvider } from '../../providers/auth/auth';
import { SettingsProvider } from '../../providers/settings/settings';
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the Login1Page page.
 * 
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 
 */

@IonicPage()
@Component({
  selector: 'page-login1',
  templateUrl: 'login1.html',
})
export class Login1Page {

  countries_codes: any;
  selectOptions: any;

  signup = { 
    fname: '', 
    lname: '', 
    // cu_code: '',
    phone: '', 
    password: '', 
    password_confirmation: '',
    company_name: '', 
    email: ''
  }
  signupForm : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:AuthProvider, public toastCtrl: ToastController, public _settings: SettingsProvider,public error_helper:HelperProvider) {
    this.signupForm = new FormGroup({
      'company_name': new FormControl(this.signup.company_name),
      'fname': new FormControl(this.signup.fname, [Validators.required]),
      'lname': new FormControl(this.signup.lname, [Validators.required]),
      'phone': new FormControl(this.signup.phone, [Validators.required,Validators.maxLength(20),
        Validators.minLength(6)]),
      'password': new FormControl(this.signup.password, [Validators.required]),
      'password_confirmation': new FormControl(this.signup.password_confirmation, [Validators.required]),
      'email': new FormControl(this.signup.email, [Validators.required]),
      // 'cu_code': new FormControl(this.signup.cu_code, [Validators.required]),
    });
  }
  ionViewWillEnter(){
    this._settings.calling_code().subscribe( 
      res => { 
        this.countries_codes = JSON.parse(res['_body'])
        console.log(this.countries_codes.countriesCodes); 
      },
      error => {
        this.presentToast(this.error_helper.Error_Handler(error));
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login1Page');
      this.selectOptions = {
      cssClass: 'addressOptions'
    };
  }
  checkEmailOrPhone(field,name){ 
    this.auth.checkEmailOrPhone(field).subscribe(
      (res) => {

          if(name == 'phone'){
            this.signupForm.controls.phone.setErrors({'exist': true});
          }else
           this.signupForm.controls.email.setErrors({'exist': true});
      },(error) => {
        this.error_helper.Error_Handler(error);
    });
  }
  validPassword(){
    if( this.signup.password != this.signup.password_confirmation ){     
      this.signupForm.controls.password_confirmation.setErrors({'noEqual': true});
    }else{
      // this.signupForm.controls.password_confirmation.setErrors({'noEqual': false});
      // this.signup.password_confirmation = this.signup.password_confirmation;
    }
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
  goToLogin(){
    this.navCtrl.push(Login2Page);
  }
  Signup(){
      this.navCtrl.push(SingnupmapPage,{data: this.signup});
  }
}
