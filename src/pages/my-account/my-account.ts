import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { BillingPage } from '../billing/billing';
import { TransactionsPage } from '../../pages/transactions/transactions';
import { PromoCodePage } from '../promo-code/promo-code';
import { NotificationsPage } from '../notifications/notifications';
import { AddressesManagementPage } from '../addresses-management/addresses-management';
import { IntroPage } from '../intro/intro';
import { ChangePasswordPage } from '../change-password/change-password';

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }
  goToAddressesManagementPage() {
    this.navCtrl.push(AddressesManagementPage);
  }
  goToBillingPage() {
    this.navCtrl.push(BillingPage);
  }
  goToBankaccountPage() {
    this.navCtrl.push(TransactionsPage);
  }
  goToPromoCodePage() {
    this.navCtrl.push(PromoCodePage);
  }
  goToNotificationsPage() {
    this.navCtrl.push(NotificationsPage);
  }
  ChangePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }
  LogOut() {
    localStorage.removeItem('token')
    this.app.getRootNav().setRoot(IntroPage);
  }
}
