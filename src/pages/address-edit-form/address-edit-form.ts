import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, Platform, ModalController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsProvider } from '../../providers/settings/settings';
import { ProfileProvider } from '../../providers/profile/profile';
import { MaplocationPage } from '../../pages/maplocation/maplocation';
import * as $ from "jquery";
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the AddressEditFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-edit-form',
  templateUrl: 'address-edit-form.html',
})
export class AddressEditFormPage {

  mainAddress;
  countries = [];
  cities = [];
  formdata = { 'label': '', 'country_id': '', 'city_id': '', 'district': '', 'address_phone': '', 'secondary_phone': '', 'building_no': '', 'st_no': '', 'zip_code': '', 'town': '', 'mark': '', lat: '0', lng:'0', location: '' };
  lat;
  long;
  EditMainAdress: FormGroup;
  selectOptions: any;
  preloader = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider,
  public settings: SettingsProvider ,private toastCtrl: ToastController, public platform: Platform, public modalCtrl: ModalController,public error_helper:HelperProvider) {

    this.EditMainAdress = new FormGroup({
      'label': new FormControl(this.formdata.label, [Validators.required]),
      'country_id': new FormControl(this.formdata.country_id, [Validators.required]),
      'city_id': new FormControl(this.formdata.city_id, [Validators.required]),
      'district': new FormControl(this.formdata.district, [Validators.required]),
      'address_phone': new FormControl(this.formdata.address_phone, [Validators.required]),
      'location': new FormControl(this.formdata.location, [Validators.required]),
      'secondary_phone': new FormControl(this.formdata.secondary_phone),
      'building_no': new FormControl(this.formdata.building_no),
      'st_no': new FormControl(this.formdata.st_no),
      'zip_code': new FormControl(this.formdata.zip_code),
      'town': new FormControl(this.formdata.town),
      'mark': new FormControl(this.formdata.mark),
    });

   
  }

  ionViewWillEnter(){
    this.getCountries();
    
  }

  getProfile(){
    this.profile.Get().subscribe( 
      (res) => 
      { 
         this.mainAddress = JSON.parse(res['_body'])['user'];
         console.log('my address',this.mainAddress); 
         this.formdata.country_id = this.mainAddress.address.country_id;
         this.selectCity();
         this.formdata.lat = this.mainAddress.address.lat;
         this.formdata.lng = this.mainAddress.address.lng;
         this.formdata.location = this.mainAddress.address.lat+','+this.mainAddress.address.lng;
         this.settings.GetFormattedAddress(this.formdata.location).subscribe(res => { this.formdata.location = res['results'][0].formatted_address } );
         this.preloader = false;
      },error=>{
        this.presentToast(this.error_helper.Error_Handler(error));
      });
  }

  getCountries() {
    this.settings.countries().subscribe(
      (res) => {
        this.countries = JSON.parse(res['_body']).countries;
        console.log(this.countries);
        this.getProfile();
      },
      (error) =>
      {
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    );
  }

  selectCity() {
    this.cities = this.countries.filter((it) => {
      return it.id == this.formdata.country_id
    })[0];
    this.formdata.city_id = this.mainAddress.address.city_id;
  }

  EditMyAddress() {
    //this.formdata.address_phone = Number(this.formdata.address_phone);
    delete this.formdata.location;
    this.profile.Update(this.formdata).subscribe(
      res => {
        this.getCountries();
        this.getProfile();
        console.log(res);
        this.navCtrl.pop();
      },error=>{
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    )
    console.log(this.formdata)
  }

  ionViewDidLoad() {
    setTimeout(()=>{
      $('.togglerMoreInfo').on('click', function () {
        $('.MoreInfo').toggle({ duration: 180, easing: 'swing' });
        $('.scroll-content').scrollTop(300)
      });
    },1000)
    
    this.selectOptions = {
      cssClass: 'addressOptions'
    };
  }

  getLocation(){
    let profileModal = this.modalCtrl.create(MaplocationPage, { lat: this.mainAddress.address.lat , lng: this.mainAddress.address.lng });
    profileModal.onDidDismiss(data => {
      console.log(data);
      if(data != null && data.lat != 'undefined' && data.long != 'undefined'){
        this.formdata.lat = data.lat.toString(); this.formdata.lng = data.long.toString();
        this.formdata.location = data.formatted_address;
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
