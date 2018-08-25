import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { WithdrawProvider } from '../../providers/withdraw/withdraw';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the NewBankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-bank',
  templateUrl: 'new-bank.html',
})
export class NewBankPage {
  selectOptions

  addData = { bank_id:null, acc_name:null, acc_no:null };
  addForm: FormGroup;
  banks: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _wd: WithdrawProvider,private toastCtrl: ToastController,public error_helper:HelperProvider) {
    this.addForm = new FormGroup({
      bank_id: new FormControl(this.addData.bank_id, Validators.required),
      acc_name:  new FormControl(this.addData.acc_name, Validators.required),
      acc_no:  new FormControl(this.addData.acc_no, Validators.required)
    });

    this._wd.Banks().subscribe(
        res => {
          this.banks = JSON.parse(res['_body']);
    },error=>{
      this.presentToast(this.error_helper.Error_Handler(error));
    });
  }

  Submit()
  {
    this._wd.MakeWithdraw(this.addData).subscribe(res =>{ this.navCtrl.pop()},error=>{
      this.presentToast(this.error_helper.Error_Handler(error));
    });
    console.log(this.addData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewBankPage');
    this.selectOptions = {
      cssClass: 'addressOptions'
    };
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
}
