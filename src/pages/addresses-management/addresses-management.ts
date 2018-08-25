import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
// import { AddressesPage } from '../addresses/addresses';
import { SenderAddressesPage } from '../sender-addresses/sender-addresses';
import { AddressEditFormPage } from '../address-edit-form/address-edit-form';

/**
 * Generated class for the AddressesManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addresses-management',
  templateUrl: 'addresses-management.html',
})
export class AddressesManagementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressesManagementPage');
  }
  goToAddressesPage(){
    this.navCtrl.push(SenderAddressesPage);
  }

  goToAddressEditForm(){
    this.navCtrl.push(AddressEditFormPage);
  }

}
