import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController } from 'ionic-angular';
import { NewBankPage } from '../../pages/new-bank/new-bank';
import { EditBankPage } from '../../pages/edit-bank/edit-bank';
import { WithdrawProvider } from '../../providers/withdraw/withdraw';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the BanksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-banks',
  templateUrl: 'banks.html',
})
export class BanksPage {

  withdraws: any;
  requestDone = 0;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public _withdraws: WithdrawProvider,private toastCtrl: ToastController,public error_helper:HelperProvider) {
  }

  editBank(data) {
    this.navCtrl.push(EditBankPage, { data: data });
  }

  newBank() {
    this.navCtrl.push(NewBankPage);
  }


  ionViewWillEnter()
  {
    this._withdraws.GetWithdraw().subscribe(
      res => { this.withdraws = JSON.parse(res['_body']); console.log('withdraws', this.withdraws);
      this.requestDone = 1;
    },error=>{
      this.presentToast(this.error_helper.Error_Handler(error));
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BanksPage');
  }
  presentToast(mes) {
    let toast = this.toastCtrl.create({
      message: mes,
      duration: 3000,
      position: 'bottom',
      cssClass: "toast",
    });
    toast.present();
  }
  
}
