import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController } from 'ionic-angular';
import { NewTransactionPage } from '../../pages/new-transaction/new-transaction';
import { TransactionProvider } from '../../providers/transaction/transaction';
import { HelperProvider } from '../../providers/helper/helper';
import { ProfileProvider } from '../../providers/profile/profile';
import { WithdrawProvider } from '../../providers/withdraw/withdraw';

/**
 * 
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  banktransctions: any = [];
  trans1:any = [];
  trans2:any = [];
  page = 1;
  isNextPageExist = false;
  requestDone = 0;
  buttonstatus: boolean = true;
  balance;
  withdraws = [];
  lasttrans;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public toastCtrl: ToastController, public _transction: TransactionProvider,public error_helper:HelperProvider, public _profile: ProfileProvider, public _wd: WithdrawProvider) {
    
    this._wd.GetWithdraw().subscribe(res => {
      this.withdraws =  JSON.parse(res['_body']).withdraws;
      // this.withdraws.length
    });
    this._profile.Get().subscribe((res)=>{
      this.balance = JSON.parse(res['_body']).user.credit.balance;
    },(err)=>{

    })
    this.transctions();
  }

  myDate(value){
    return value.replace(/\s/g, "T");
  }

  transctions(refresher = null, infiniteScroll = null) {
  
    this._transction.transction(this.page).subscribe((res) => {
      
      if( JSON.parse(res['_body']).transactions.next_page_url != null ){
        this.page = ++this.page ;
        this.isNextPageExist = true;
      }else{
        this.page = 0;
        this.isNextPageExist = false;
      } 
      
      if( this.isNextPageExist && refresher == null)
      {
        console.log(JSON.parse(res['_body']).transactions.data);
        JSON.parse(res['_body']).transactions.data.forEach(element => {
          this.banktransctions.push(element);
          if(element.status === 'pending') this.trans1.push(element)
          else this.trans2.push(element)
        });
      }else{
        console.log('new object',JSON.parse(res['_body']).transactions)
        this.banktransctions = JSON.parse(res['_body']).transactions.data;
        this.trans1 = this.banktransctions.filter((it) => it.status === 'pending' );
        this.trans2 = this.banktransctions.filter((it) => it.status != 'pending' );
      }
      this.requestDone = 1;
      this.lasttrans = this.banktransctions.filter((it) => it.status === 'pending' );
      if(this.lasttrans.lenght > 0){
        this.buttonstatus = true;
      }
      if(refresher != null)
        refresher.complete();
      if(infiniteScroll != null)
        infiniteScroll.complete();

    }, (error)=>{
      // this.requestDone = 2;
      this.presentToast(this.error_helper.Error_Handler(error));
    });

   

    
  }

  toast() {
    if(this.withdraws.length === 0){
      this.presentToast('لم تقم باضافة حساب بنكي اذهب الي اعدادات البنك');
    }else if (this.buttonstatus === true) {
      this.presentToast('يوجد تحويل قيد الانتظار لا يمكنك عمل تحويل اخر قبل الانتهاء من التحويل الاخير');
    }else{
      this.newTrans();
    }
  }

  doRefresh(refresher) {
    this.transctions(refresher);
  }
  
  newTrans() {
    this.navCtrl.push(NewTransactionPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }
  presentToast(ms) {
    let toast = this.toastCtrl.create({
      message: ms,
      duration: 5000,
      position: 'bottom',
      cssClass: "toast",
    });
    toast.present();
  } 

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.transctions(null, infiniteScroll);
  }
}
