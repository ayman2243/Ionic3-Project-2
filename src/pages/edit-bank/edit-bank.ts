import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { WithdrawProvider } from '../../providers/withdraw/withdraw';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the EditBankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-bank',
  templateUrl: 'edit-bank.html',
})
export class EditBankPage {

  wdInfo: any;
  banks: any;
  editData = { acc_name: null, acc_no: null, bank_id: null };
  editForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _wd: WithdrawProvider,public toastCtrl: ToastController,public error_helper:HelperProvider) {
    this.wdInfo = this.navParams.get('data');
    this.editData.acc_name =  this.wdInfo.acc_name;
    this.editData.acc_no =  this.wdInfo.acc_no;
    this.editData.bank_id = this.wdInfo.bank_id;
    this._wd.Banks().subscribe(
        res => {
          this.banks = JSON.parse( res['_body']);
    },error=>{
      this.presentToast(this.error_helper.Error_Handler(error));
    });
   this.editForm = new FormGroup({
     'acc_name': new FormControl(this.editData.acc_name, Validators.required),
     'acc_no': new FormControl(this.editData.acc_no, Validators.required),
     'bank_id': new FormControl(this.editData.bank_id, Validators.required)
   });
  }


  Submit()
  {
    console.log(this.editData);
    this._wd.EditWithdraw(this.wdInfo.id, this.editData).subscribe(res => this.navCtrl.pop());
  }

  Delete(id: number)
  {
    this._wd.DeleteWithdraw(id).subscribe(res => {this.navCtrl.pop()
    },error=>{
      this.presentToast(this.error_helper.Error_Handler(error));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditBankPage');
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
