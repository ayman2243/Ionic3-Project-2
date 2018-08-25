import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { AddressesProvider } from '../../providers/addresses/addresses';
import { AddOtherAddressPage } from '../add-other-address/add-other-address';
import { EditOtherAddressesPage } from '../edit-other-addresses/edit-other-addresses';
import * as $ from 'jquery';
import { HelperProvider } from '../../providers/helper/helper';
/**
* Generated class for the SenderAddressesPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-sender-addresses',
  templateUrl: 'sender-addresses.html',
})
export class SenderAddressesPage {
  addresses;
  address = {
    label: '',
    city_id: 0,
    country_id: 0,
    district: '',
    address_phone: 0,
    lat: 0.0,
    lng: 0.0
  };


  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public viewCtrl: ViewController, public _Address: AddressesProvider, public toastCtrl: ToastController,public error_helper:HelperProvider) {
    this.getData();
  }

  getData() {
    this._Address.Get().subscribe(
      (res) => {
        this.addresses = JSON.parse(res['_body']).addresses;
        console.log(this.addresses);
      },
      error => {
        this.presentToast(this.error_helper.Error_Handler(error));
      },
      () => {

      });
  }

  ionViewWillEnter() {
    this.getData();
  }
  ionViewDidLoad() {
    console.log('Did load');
  }

  // ionViewDidEnter(){ 
  // $('.card').on('click',function(){
  // $(this).find('.togglerContent').toggle();
  // });
  // this.getData();
  // }

  toggle(cardId){
    $('body').find('#card'+cardId).find('.togglerContent').toggle();
  }

  delete(id) {
    this._Address.Delete(id).subscribe(
      (res) => {
        console.log(res);
        this.ionViewWillEnter();
      },
      (error) => {
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    )
  }



  AddAddress() {
    this.navCtrl.push(AddOtherAddressPage)
  }
  EditAddress(data) {
    this.navCtrl.push(EditOtherAddressesPage, { data: data })

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