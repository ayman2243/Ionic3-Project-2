import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController} from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionProvider } from '../../providers/transaction/transaction';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the NewTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-new-transaction',
  templateUrl: 'new-transaction.html',
})

export class NewTransactionPage {
banks:any;
transctionbank = {bank: '',amount:'' };
  formgroupz:FormGroup;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public transction:TransactionProvider,private toastCtrl: ToastController,public error_helper:HelperProvider
  ) {
    this.formgroupz = new FormGroup({
      'bank': new FormControl(this.transctionbank.bank, [Validators.required]),
      'amount': new FormControl(this.transctionbank.amount, Validators.required),
    });
      this.getBanks();
  }
  
getBanks(){
 this.transction.banks().subscribe(
   (res)=>
   {
     this.banks=JSON.parse(res['_body']).withdraws;
     console.log('------',this.banks);
         },
         (error) =>
         {
          this.presentToast(this.error_helper.Error_Handler(error));
         }
       );
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTransactionPage');
  }
  sendtransction(){
    console.log(this.transctionbank);
    this.transction.send(this.transctionbank.bank,this.transctionbank.amount).subscribe(
      res => 
      { 
        console.log(res);
        this.navCtrl.pop();
      }
      ,error =>
      {
        this.presentToast(this.error_helper.Error_Handler(error));
        this.transctionbank.bank = null;
        this.transctionbank.amount = null;
      }
    );
  }
  presentToast(ms) {
    let toast = this.toastCtrl.create({
      message: ms,
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
