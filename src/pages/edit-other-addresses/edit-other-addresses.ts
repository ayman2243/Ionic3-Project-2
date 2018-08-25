import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController,ModalController, Platform} from 'ionic-angular';
import { MaplocationPage } from '../../pages/maplocation/maplocation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsProvider } from '../../providers/settings/settings';
import { AddressesProvider } from '../../providers/addresses/addresses';
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the EditOtherAddressesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// import { HelperProvider } from '../../providers/helper/helper';
// ,public error_helper:HelperProvider
// this.presentToast(this.error_helper.Error_Handler(error));
@Component({
  selector: 'page-edit-other-addresses',
  templateUrl: 'edit-other-addresses.html',
})
export class EditOtherAddressesPage {

  otherAddress;
  selectOptions: any;
  countries = [];
  cities = [];
  lat;
  long;
  addressdata = { 'label': '', 'country_id': '', 'city_id': '', 'district': '', 'address_phone': '', lat: '0', lng: '0', location: '', st_no: '' };
  EditOtherAdress: FormGroup;
  oldData;
  constructor(public navCtrl: NavController, public navParams: NavParams,public error_helper:HelperProvider, 
  public settings: SettingsProvider ,public _Address : AddressesProvider , public toastCtrl: ToastController, public platform: Platform, public modalCtrl: ModalController) {

    this.otherAddress = this.navParams.get('data');
    this.addressdata.lat = this.otherAddress.lat;
    this.addressdata.lng = this.otherAddress.lng;
    
    if( this.addressdata.lat != '0' && this.addressdata.lng != '0'){
      this.addressdata.location = this.otherAddress.lat+','+this.otherAddress.lng;
      this.settings.GetFormattedAddress(this.addressdata.location).subscribe(res => this.addressdata.location = res['results'][0].formatted_address )
    }
    console.log("old address", this.otherAddress);

    this.EditOtherAdress = new FormGroup({
      'label': new FormControl(this.addressdata.label, [Validators.required]),
      'country_id': new FormControl(this.addressdata.country_id, [Validators.required]),
      'city_id': new FormControl(this.addressdata.city_id, [Validators.required]),
      'district': new FormControl(this.addressdata.district, [Validators.required]),
      'address_phone': new FormControl(this.addressdata.address_phone, [Validators.required]),
      'location': new FormControl(this.addressdata.location),
      'lat': new FormControl(this.addressdata.lat),
      'lng': new FormControl(this.addressdata.lng),
      'st_no': new FormControl(this.addressdata.st_no),
    });

    this.getCountries();
  }
  ionViewDidLoad() {
    this.selectOptions = {
      cssClass: 'addressOptions'
    };
  }

  getLocation(){
    let profileModal = this.modalCtrl.create(MaplocationPage,  { lat: this.otherAddress.lat , lng: this.otherAddress.lng });
    profileModal.onDidDismiss(data => {
      console.log('model data',data);
      if(data != null && data.lat != undefined && data.long != undefined){
        this.addressdata.lat = data.lat.toString(); this.addressdata.lng = data.long.toString();
        this.addressdata.location = data.formatted_address;
      }else{
        this.presentToast('لم تقم بأختيار موقعك علي الخريطة');
      }
    });
    profileModal.present();
  }
  
  getCountries() {
    this.settings.countries().subscribe(
      (res) => {
        this.countries = JSON.parse(res['_body']).countries;
        console.log(this.countries);
        this.addressdata.country_id = this.otherAddress.country_id;
        this.selectCity();
      },
      (error) =>
      {
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    );
  }

  selectCity() {
    this.cities = this.countries.filter((it) => {
      return it.id == this.addressdata.country_id
    })[0];
    console.log(this.cities);
    this.addressdata.city_id = this.otherAddress.city_id;
  }

  EditAddress() {
    delete this.addressdata.location;
    this._Address.Update(this.otherAddress.id, this.addressdata).subscribe(
      res => {
        this.getCountries();
        console.log(res);
        this.navCtrl.pop();
      },error=>{
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    )
    console.log(this.addressdata)
  }


  goBack() {
    this.navCtrl.pop();
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
}
