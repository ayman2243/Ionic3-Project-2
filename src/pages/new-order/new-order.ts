import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { ModalApprovementPage } from '../modal-approvement/modal-approvement';
import { MyAccountPage } from '../my-account/my-account';
import { OrdersProvider } from '../../providers/orders/orders';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsProvider } from '../../providers/settings/settings';
import { AddressesProvider } from '../../providers/addresses/addresses';
import { ProfileProvider } from '../../providers/profile/profile';
import { MaplocationPage } from '../../pages/maplocation/maplocation';
import * as $ from "jquery";
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the NewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-order',
  templateUrl: 'new-order.html',
})
export class NewOrderPage {

  countries;
  citiesSender = [];
  citiesReceiver = [];
  otherAdd;
  extra_services;
  selectOptions: any;
  prices = { 'charge_price': 0, 'delivery_price': 0 };
  currentHour = new Date().getHours();
  OrderData = {
    'payment_method': 'sender',
    'day': (this.currentHour >= 20) ? 'tomorrow' :'today',
    'start_hour':  this.closedTimeToOrder() || 0,
    'sender_st_no': '',
    'receiver_st_no': '',
    'end_hour': 0,
    'sender_addr': 'main',
    'receiver_addr': 'id',
    'sender_label': '',
    'sender_country_id': 0,
    'sender_city_id': 0,
    'sender_phone': '',
    'sender_lat': '0',
    'sender_lng': '0',
    'sender_district': '',
    'receiver_label': '',
    'receiver_city_id': 0,
    'receiver_country_id': 0,
    'receiver_phone': '',
    'receiver_lat': '0',
    'receiver_lng': '0',
    'receiver_district': '',
    'sender_save_addr': false,
    'receiver_save_addr': false,
    'sender_addr_id': null,
    'receiver_addr_id': null,
    'collect': null,
    'extras': [],
    'slocation': '',
    'rlocation': ''
  };

  OrderForm: FormGroup;
  mainAddressId;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public _orders: OrdersProvider, public _settings: SettingsProvider, public _otherAdd: AddressesProvider, public _profile: ProfileProvider, private toastCtrl: ToastController,public error_helper:HelperProvider) {


    this.OrderForm = new FormGroup({
      'payment_method': new FormControl(this.OrderData.payment_method, [Validators.required]),
      'day': new FormControl(this.OrderData.day, [Validators.required]),
      'start_hour': new FormControl(this.OrderData.start_hour, [Validators.required]),
      'end_hour': new FormControl(this.OrderData.end_hour),
      'sender_addr': new FormControl(this.OrderData.sender_addr, [Validators.required]),
      'receiver_addr': new FormControl(this.OrderData.receiver_addr, [Validators.required]),
      'sender_label': new FormControl(this.OrderData.sender_label),
      'sender_country_id': new FormControl(this.OrderData.sender_country_id),
      'sender_city_id': new FormControl(this.OrderData.sender_city_id),
      'sender_phone': new FormControl(this.OrderData.sender_phone),
      'sender_lat': new FormControl(this.OrderData.sender_lat),
      'sender_lng': new FormControl(this.OrderData.sender_lng),
      'sender_district': new FormControl(this.OrderData.sender_district),
      'receiver_label': new FormControl(this.OrderData.receiver_label),
      'receiver_city_id': new FormControl(this.OrderData.receiver_city_id),
      'receiver_country_id': new FormControl(this.OrderData.receiver_country_id),
      'receiver_phone': new FormControl(this.OrderData.receiver_phone),
      'receiver_lat': new FormControl(this.OrderData.receiver_lat),
      'receiver_lng': new FormControl(this.OrderData.receiver_lng),
      'receiver_district': new FormControl(this.OrderData.receiver_district),
      'sender_save_addr': new FormControl(this.OrderData.sender_save_addr),
      'receiver_save_addr': new FormControl(this.OrderData.receiver_save_addr),
      'sender_addr_id': new FormControl(this.OrderData.sender_addr_id),
      'receiver_addr_id': new FormControl(this.OrderData.receiver_addr_id),
      'collect': new FormControl(this.OrderData.collect),
      'extras': new FormControl(this.OrderData.extras),
      'slocation': new FormControl(this.OrderData.slocation),
      'rlocation': new FormControl(this.OrderData.rlocation),
      'sender_st_no': new FormControl(this.OrderData.sender_st_no),
      'receiver_st_no': new FormControl(this.OrderData.receiver_st_no)
    });

    this.getExtraServices();
  }


  getExtraServices(){
    this._orders.GetExtraServices().subscribe(
      (res) =>{
        this.extra_services = res;
        console.log('---------------------',this.extra_services)
      }
    );
    
  }

  getLocation(type){
    let profileModal = this.modalCtrl.create(MaplocationPage);
    profileModal.onDidDismiss(data => {
      console.log(data);
      if(data != null && data.lat != 'undefined' && data.long != 'undefined'){
        if(type == 's'){
          this.OrderData.sender_lat = data.lat.toString(); this.OrderData.sender_lng = data.long.toString();
          this.OrderData.slocation = data.formatted_address;
        }else{
          this.OrderData.receiver_lat = data.lat.toString(); this.OrderData.receiver_lng = data.long.toString();
          this.OrderData.rlocation = data.formatted_address;
        }
      }else{
        this.presentToast('لم تقم بأختيار اي موقع علي الخريطة');
      }
    });
    profileModal.present();
  }

  ionViewDidLoad() {
    $('.toginfo').on('click', function () {
      $('.info').toggle({ duration: 180, easing: 'swing' });
      //$('.scroll-content').scrollTop(300);
    });
    console.log('ionViewDidLoad NewOrderPage');
    this.selectOptions = {
      cssClass: 'addressOptions'
    };
  }

  ionViewWillEnter(){
    this._profile.Get().subscribe(
      res => {
        var data = JSON.parse(res['_body']);
        console.log('profile',JSON.parse(res['_body']));
        this.OrderData.sender_addr_id = data.user.address.id;
        this.OrderData.receiver_addr_id = data.user.address.id;
        this.mainAddressId = data.user.address.id;
      },error=>{
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    );

    this._otherAdd.Get().subscribe(
      res => {
        this.otherAdd = JSON.parse(res['_body']).addresses;
        console.log(this.otherAdd);
      },
      error => {
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    );
    this._settings.countries().subscribe(
      (res) => {
        this.countries = JSON.parse(res['_body']).countries;
        console.log(this.countries);
      },
      (error) => {
        this.presentToast(this.error_helper.Error_Handler(error));
      });

    this._settings.price().subscribe((res) => {
      this.prices = JSON.parse(res['_body']);
      console.log(this.prices);
    },
      (error) => {
        this.presentToast(this.error_helper.Error_Handler(error));
      });
  }


  send() {

    if (this.OrderData.sender_addr == 'main' && this.OrderData.receiver_addr == 'main') {
      this.presentToast('خطاء في العنوان، عنوان المرسل نفس عنوان المستلم');
    }
    if (this.OrderData.sender_addr == 'id'
      && this.OrderData.receiver_addr == 'id'
      && this.OrderData.receiver_addr_id == this.OrderData.sender_addr_id) {
      this.presentToast('خطاء في العنوان، عنوان المرسل نفس عنوان المستلم');
    }
    else if (this.OrderData.sender_addr == 'id' && this.OrderData.receiver_addr_id == this.mainAddressId) {
      this.presentToast('خطاء في البيانات تاكد ان معلوماتك صحيحة ');
    }
    else if (this.OrderData.receiver_addr == 'id' && this.OrderData.receiver_addr_id == this.mainAddressId) {
      this.presentToast('خطاء في البيانات تاكد ان معلوماتك صحيحة ');
    }
    else if (this.OrderData.receiver_addr == 'new' && ( this.OrderData.receiver_country_id == 0 ||this.OrderData.receiver_city_id == 0 || this.OrderData.receiver_label == null || this.OrderData.receiver_district == null || this.OrderData.receiver_phone == null )) {
      this.presentToast('خطاء في البيانات تاكد ان معلوماتك صحيحة ');
    }
    else if (this.OrderData.sender_addr == 'new' && ( this.OrderData.sender_country_id == 0 ||this.OrderData.sender_city_id == 0 || this.OrderData.sender_label == null || this.OrderData.sender_district == null || this.OrderData.sender_phone == null )) {
      this.presentToast('خطاء في البيانات تاكد ان معلوماتك صحيحة ');
    }
    
    else {

      if (this.OrderData.sender_addr == 'main' || this.OrderData.sender_addr == 'id') {
        delete  this.OrderData.sender_country_id
        delete this.OrderData.sender_city_id
        delete  this.OrderData.sender_label;
        delete this.OrderData.sender_district;
        delete this.OrderData.sender_phone;
        delete this.OrderData.sender_lat;
        delete this.OrderData.sender_lng;
        delete this.OrderData.slocation;
        delete this.OrderData.sender_st_no;
      }
      if(this.OrderData.sender_addr == 'new'){
        delete this.OrderData.sender_addr_id;
      }
      if(this.OrderData.receiver_addr == 'new'){
        delete this.OrderData.receiver_addr_id;
      }
      if (this.OrderData.receiver_addr == 'main' || this.OrderData.receiver_addr == 'id') {
        delete this.OrderData.receiver_country_id;
        delete this.OrderData.receiver_city_id;
        delete this.OrderData.receiver_label
        delete this.OrderData.receiver_district 
        delete this.OrderData.receiver_phone;
        delete this.OrderData.receiver_lat;
        delete this.OrderData.receiver_lng;
        delete this.OrderData.rlocation;
        delete this.OrderData.receiver_st_no;
      }

      if(this.OrderData.collect != null && this.OrderData.collect > 0){
        this.OrderData.collect = parseInt(this.OrderData.collect);
      }else{
        delete this.OrderData.collect;
      }
      var res = this.OrderData.start_hour.toString().split('-');
      this.OrderData.start_hour = Number(res[1].trim());
      this.OrderData.end_hour = Number(res[0].trim());

      this._orders.Create(this.OrderData).subscribe
        (
        res => {
          var data = JSON.parse(res['_body']);
          this.OrderData.start_hour = this.closedTimeToOrder();
          this.presentModal(data)
        },
        error => {
          this.OrderData.start_hour = this.closedTimeToOrder();
        }
        );
    }

    console.log(this.OrderData);
  }

  selectCitySender() {
    this.citiesSender = this.countries.filter((it) => {
      return it.id == this.OrderData.sender_country_id
    })[0];

    console.log(this.citiesSender);
  }

  selectCityReceiver() {
    this.citiesReceiver = this.countries.filter((it) => {
      return it.id == this.OrderData.receiver_country_id
    })[0];

    console.log(this.citiesReceiver);
  }

  presentModal(data) {
    let modal = this.modalCtrl.create(ModalApprovementPage, { data: data });
    modal.onDidDismiss(data => {
      if (data.newOrder)
        this.navCtrl.parent.select(1);
      else
        this.navCtrl.parent.select(2);
      this.navCtrl.push(NewOrderPage);
    });
    modal.present();
  }

  backToOrders1Page() {
    this.navCtrl.setRoot(MyAccountPage);
  }

  presentToast(m) {
    let toast = this.toastCtrl.create({
      message: m,
      duration: 5000,
      position: 'bottom',
      cssClass: "toast",
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  closedTimeToOrder(){
    if(this.currentHour >= 10 && this.currentHour < 12){
      return '12 - 10'
    }else if(this.currentHour >= 12 && this.currentHour < 14){
      return '02 - 12'
    }else if(this.currentHour >= 14 && this.currentHour < 16){
      return '04 - 02'
    }else if(this.currentHour >= 16 && this.currentHour < 18){
      return '06 - 04'
    }else if(this.currentHour >= 18 && this.currentHour < 20){
      return '08 - 06'
    }else if(this.currentHour >= 20 && this.currentHour < 22){
      return '10 - 08'
    }else{
      return '12 - 10'
    }
  }

  reSetTheTime(){
    this.OrderData.start_hour = this.closedTimeToOrder();
  }

}
