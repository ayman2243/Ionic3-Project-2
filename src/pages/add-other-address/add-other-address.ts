import { Component } from '@angular/core';
import { NavController, NavParams,ToastController, ModalController ,Platform } from 'ionic-angular';
import { MaplocationPage } from '../../pages/maplocation/maplocation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsProvider } from '../../providers/settings/settings';
import { AddressesProvider } from '../../providers/addresses/addresses';
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the AddOtherAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-other-address',
  templateUrl: 'add-other-address.html',
})
export class AddOtherAddressPage {
  otherAddress;
  countries = [];
  cities = [];
  lat;
  long;
  addressdata = { 'label': '', 'country_id': '', 'city_id': '', 'district': '', 'address_phone': '',location: '', lat:0 ,lng:0, st_no:''  };
  AddOtherAdress: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _settings: SettingsProvider, public _Address : AddressesProvider,private toastCtrl: ToastController, public platform: Platform, public modalCtrl: ModalController,public error_helper:HelperProvider) {
    this.AddOtherAdress = new FormGroup({
      'label': new FormControl(this.addressdata.label, [Validators.required]),
      'country_id': new FormControl(this.addressdata.country_id, [Validators.required]),
      'city_id': new FormControl(this.addressdata.city_id, [Validators.required]),
      'district': new FormControl(this.addressdata.district, [Validators.required]),
      'address_phone': new FormControl(this.addressdata.address_phone, [Validators.required,Validators.maxLength(20),
        Validators.minLength(6)]),
      'location': new FormControl(this.addressdata.location),
      'st_no': new FormControl(this.addressdata.st_no),
    });

    this.getCountries();

  }

  getCountries() {
    this._settings.countries().subscribe(
      (res) => {
        this.countries = JSON.parse(res['_body']).countries;
        console.log(this.countries);
      },
      (error) => {
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    );
  }
  selectCity() {
    this.cities = this.countries.filter((it) => {
      return it.id == this.addressdata.country_id
    })[0];
    console.log(this.cities);
  }

  AddOtherAddress()
  {
    delete this.addressdata.location;
    this._Address.Add(this.addressdata).subscribe(
      res => 
      { 
        console.log(res);
        this.navCtrl.pop();
      },error=>{
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    )
    console.log(this.addressdata)
  }



  ionViewDidLoad() {

  }

  getLocation(){
    let profileModal = this.modalCtrl.create(MaplocationPage);
    profileModal.onDidDismiss(data => {
      console.log(data);
      if(data != null && data.lat != 'undefined' && data.long != 'undefined'){
        this.addressdata.lat = data.lat.toString(); this.addressdata.lng = data.long.toString();
        this.addressdata.location = data.formatted_address;
      }else{
        this.presentToast('لم تقم بأختيار موقعك علي الخريطة');
      }
    });
    profileModal.present();
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
