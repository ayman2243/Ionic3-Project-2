import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, ModalController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaplocationPage } from '../../pages/maplocation/maplocation';
import { SettingsProvider } from '../../providers/settings/settings';
import { AuthProvider } from '../../providers/auth/auth';
import { VerificationPage } from '../../pages/verification/verification';
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the SingnupmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singnupmap',
  templateUrl: 'singnupmap.html',
})
export class SingnupmapPage {

  countries;
  selectOptions: any;
  cities = [];
  lat = 0;
  long = 0;
  calling_code;
  address = [{ label: '', country_id:'', city_id:'', district:'', address_phone:'', secondary_phone: '', town:'', mark:'', building_no:'', st_no:'', location:'' }];
  addressForm: FormGroup; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public settings: SettingsProvider, public toastCtrl: ToastController, public auth: AuthProvider, public platform: Platform, public modalCtrl: ModalController,public error_helper:HelperProvider) {

    this.settings.countries().subscribe((res) => {
        this.countries = JSON.parse(res['_body']).countries;
        console.log(this.countries);
      }, error => {
        this.presentToast(this.error_helper.Error_Handler(error));
    });

    this.addressForm = new FormGroup({
      'label': new FormControl(this.address[0].label, [Validators.required]),
      'country_id': new FormControl(this.address[0].country_id, [Validators.required]),
      'city_id': new FormControl(this.address[0].city_id, [Validators.required]),
      'district': new FormControl(this.address[0].district, [Validators.required]),
      'address_phone': new FormControl(this.address[0].address_phone, [Validators.required]),
      'location': new FormControl(this.address[0].location),
      'secondary_phone': new FormControl(this.address[0].secondary_phone),
      'town': new FormControl(this.address[0].town),
      'mark': new FormControl(this.address[0].mark),
      'building_no': new FormControl(this.address[0].building_no),
      'st_no': new FormControl(this.address[0].st_no)
    });

  }

  selectCity()
  {   
    this.cities = this.countries.filter((it) =>
    {
      return it.id == this.address[0].country_id
    })[0];
    this.calling_code = this.cities['calling_code'];
    console.log(this.cities);
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


  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad SingnupmapPage');
    this.selectOptions = {
      cssClass: 'addressOptions'
    };
  }

  next(){
    this.auth.signup(
      this.navParams.data.data.fname, 
      this.navParams.data.data.lname, 
      this.navParams.data.data.phone,
      this.navParams.data.data.password,
      this.navParams.data.data.password_confirmation,
      this.navParams.data.data.email,
      this.navParams.data.data.company_name,
      this.calling_code,
      this.address[0].label,
      Number(this.address[0].country_id),
      Number(this.address[0].city_id),
      this.address[0].district,
      this.address[0].address_phone,
      this.lat.toString(),
      this.long.toString(),
      this.address[0].town,
      this.address[0].mark,
      this.address[0].building_no,
      this.address[0].st_no,
      '',
      this.address[0].secondary_phone,
    ).subscribe(
      (res) => {
        var user = JSON.parse(res['_body']);   
        localStorage.setItem('token', user.token)
        this.auth.sendSMS(user.user.id, user.token).subscribe(
          (res1) =>{
            this.navCtrl.setRoot(VerificationPage)
            console.log(res1);
          },(error) => {
            this.presentToast(this.error_helper.Error_Handler(error));
        });
      },
      (error) => {
        this.presentToast(this.error_helper.Error_Handler(error));
    });
    
  }

  getLocation(){
    let profileModal = this.modalCtrl.create(MaplocationPage);
    profileModal.onDidDismiss(data => {
      console.log(data);
      if(data != null && data.lat != 'undefined' && data.long != 'undefined'){
        this.lat = data.lat; this.long = data.long;
        this.address[0].location = data.formatted_address;
      }else{
        this.presentToast('لم تقم بأختيار موقعك علي الخريطة');
      }
    });
    profileModal.present();
  }
}
