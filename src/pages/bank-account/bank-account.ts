import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular'
import { FormControl, FormGroup, Validators } from '@angular/forms';;
import { WithdrawProvider } from '../../providers/withdraw/withdraw';
import { HelperProvider } from '../../providers/helper/helper';
// import { AccountPage } from '../account/account';

/**
 * Generated class for the BankAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bank-account',
  templateUrl: 'bank-account.html',
})
export class BankAccountPage {
  AllBanks;
  logo;
  banks = { bank_id: 0, acc_no: 0, acc_name: '', amount: 0, save: false };
  savedValues;
  banksForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Withdraw: WithdrawProvider ,private toastCtrl: ToastController,public error_helper:HelperProvider) {

    
    

    this.Withdraw.Banks().subscribe(
      (res) => {
        this.AllBanks = JSON.parse(res['_body']).banks;
        console.log(this.AllBanks);
        console.log(this.AllBanks.logo);
        ;

        this.Withdraw.GetWithdraw().subscribe(
          (res) =>
          {
            this.savedValues = JSON.parse(res['_body'])['withdraw']
            console.log(this.savedValues);
          },error=>{
            this.presentToast(this.error_helper.Error_Handler(error));
          }
        )
      },
      (error) => {
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    );

    this.banksForm = new FormGroup({
      'bank_id': new FormControl(this.banks.bank_id, [Validators.required]),
      'acc_no': new FormControl(this.banks.acc_no, [Validators.required]),
      'acc_name': new FormControl(this.banks.acc_name, [Validators.required]),
      'amount': new FormControl(this.banks.amount, [Validators.required]),
      'save': new FormControl(this.banks.save)
    });
  }
  



  // next() {
  //   this.Withdraw.MakeWithdraw(
  //     this.banks.bank_id,
  //     this.banks.acc_no,
  //     this.banks.acc_name,
  //     this.banks.amount,
  //     this.banks.save
   
  //   ).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.navCtrl.pop();
  //     },
  //     (error) => {
  //       // please check error ......
  //      console.log(error);
  //       var err = JSON.parse(error['_body'])
  //       if(err.amount[0])
  //       {
  //         this.presentToast();
  //       }
  //     }
  //   );
  // }
//   presentToast() {
//   let toast = this.toastCtrl.create({
//     message: 'رصيدك لا يكفى لإتمام العملية',
//     showCloseButton: true,
//     closeButtonText:'إغلاق',
//     position: 'bottom',
  
//   });

//   toast.onDidDismiss(() => {
//     console.log('Dismissed toast');
//   });

//   toast.present();
// }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankAccountPage');
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
