import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App, ToastController, LoadingController } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';
import { NewOrderPage } from '../new-order/new-order';
import { TabsPage } from '../tabs/tabs';
import * as $ from "jquery";
import { HelperProvider } from '../../providers/helper/helper';


/**
 * Generated class for the OrderdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-orderdetails',
  templateUrl: 'orderdetails.html',
})
export class OrderdetailsPage {

  data: any;
  totalPrice: any;
  id: number;
  services=[];
  extra = 0;
  collect;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public _orders: OrdersProvider, public navParams: NavParams, private alertCtrl: AlertController, public app: App, private toastCtrl: ToastController,public error_helper:HelperProvider) {
    this.id = this.navParams.get('data');
    console.log(this.id);
  }


  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'إلغاء الطلب',
      message: 'هل أنت متأكد من إلغاء الطلب ؟',
      cssClass: 'alertmsg',
      buttons: [
        {
          text: 'لا',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'نعم',
          handler: () => {
            this.cancel();
          }
        }
      ]
    });
    alert.present();
  }


  myDate(value){
    return value.replace(/\s/g, "T");
  }
  
  cancelOrder() {
    this.presentConfirm();
  }

  cancel() {
    this._orders.Cancel(this.id).subscribe(
      (res) => {
        console.log(res);
        this.navCtrl.pop();
      },
      (error) => {
        this.presentToast(this.error_helper.Error_Handler(error));
      },
      () => { console.log('complete'); });
  }

  NewOrder() {
    this.navCtrl.push(NewOrderPage);
  }

  myAccount() {
    this.app.getRootNav().push(TabsPage, { tabIndex: 4 });
  }

  

getDetails() {
  this._orders.Details(this.id).subscribe(
    (res) => {
      this.data = res.order;
      console.log(this.data);
      console.log(res);
      this.collect = (this.data.collect)? parseInt(this.data.collect) :0;
      let discount = 0;
      
      if( this.data.services != null){
        this.services = this.data.services
       }

       this.services.forEach((e)=>{
         this.extra += Number(e.amount) || 0;
       });

       if (Number(this.data.discount) > 0) {
          discount = (Number(this.data.price) + Number(this.extra)) * (Number(this.data.discount)/100.0) ;
        }

      this.totalPrice = (Number(this.data.price) + Number(this.extra) ) - Number(discount)  ;

    },
    (error) => {
      this.presentToast(this.error_helper.Error_Handler(error));
    });
  }

  ionViewWillEnter(){
    this.getDetails();
  }

  ionViewDidEnter() {
    //Bla Bla Bla
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderdetailsPage');
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
  seeMore(){
   
      $('.table-responsive').toggle({ duration: 180, easing: 'swing' });
      //$('.scroll-content').scrollTop(300);
   
  }

}
