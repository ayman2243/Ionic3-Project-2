import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { BillsProvider } from '../../providers/bills/bills';
import * as $ from "jquery";
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the BillingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html',
})
export class BillingPage {

  credit;
  transactions = [];
  dates = [];
  keys = [];
  keysF = [];
  page = 1;
  isNextPageExist = false;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public bills: BillsProvider, private toastCtrl: ToastController,public error_helper:HelperProvider) {
   
  }
  
  getBills(refresher = null, infiniteScroll = null) {
    this.bills.Get(this.page).subscribe(
      (res) => {
        this.page = ++this.page ;
        console.log(this.page);
        
        console.log('new object',JSON.parse(res['_body']))
        this.credit = JSON.parse(res['_body']).credit;
        this.transactions = JSON.parse(res['_body']).transactions;
        // JSON.parse(res['_body']).dates.forEach(element => {
        //   if(element == "perPage" || element == "currentPage" ||  element == "lastPage" ||  element == "total" || element == "nextPageUrl" || element == "prevPageUrl"){
        //     this.keysF.splice(index, 6)
        //   }
        // });
        this.keysF = Object.keys(JSON.parse(res['_body']).dates);
        this.keysF.forEach((element, index) => {
          if(element == "perPage" || element == "currentPage" ||  element == "lastPage" ||  element == "total" || element == "nextPageUrl" || element == "prevPageUrl"){
            this.keysF.splice(index, 6)
          }
        });
        this.keysF.forEach((element, index) => {
          this.dates.push(JSON.parse(res['_body']).dates[element])
          this.keys.push(element)
        });
        
        console.log(JSON.parse(res['_body']).dates);
        console.log('pushed array', this.dates);

        if (refresher != null)
          refresher.complete();
        if(infiniteScroll != null)
          infiniteScroll.complete();

 
      },
      (error) => {
        this.presentToast(this.error_helper.Error_Handler(error));

      });
  }

  toggle(itemId){
    $('body').find('#'+itemId).find('.ordersdes').toggle();
  }

  ionViewDidLoad() {
    this.getBills();
  }

  myDate(value){
    return value.replace(/\s/g, "T");
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


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getBills(refresher);
  }


  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.getBills(null, infiniteScroll);
  }

}
