import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import { NewOrderPage } from '../new-order/new-order';
import { OrdersProvider } from '../../providers/orders/orders';
import { OrderdetailsPage } from '../../pages/orderdetails/orderdetails';
/**
 * Generated class for the AOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-a-orders',
  templateUrl: 'a-orders.html',
})
export class AOrdersPage {

  pet = 'va4';
  pet2 = 'va2';
  pet3 = 'pending';
  pet4 = 'pending';
  pet5 = 'pending';
  all;
  all_pending = []
  all_approved = [];
  all_delivered = [];
  all_refunded = [];
  sender: any = [];
  sender_pending = [];
  sender_approved = [];
  sender_delivered = [];
  sender_refunded = [];
  receiver_pending = [];
  receiver_approved = [];
  receiver_delivered = [];
  receiver_refunded = [];
  receiver: any = [];
  requestDone = 0;
  pager = { 
          all : {'new': 1, 'in_progress': 1, 'delivered': 1, 'refunded': 1}, 
          sender : {'new': 1, 'in_progress': 1, 'delivered': 1, 'refunded': 1}, 
          rec : {'new': 1, 'in_progress': 1, 'delivered': 1, 'refunded': 1}, 
          }


  constructor(public navCtrl: NavController, public navParams: NavParams, public _orders: OrdersProvider, private toastCtrl: ToastController) {
  }

  

  doRefresh(refresher) {
    this.pager =  { 
                    all : {'new': 1, 'in_progress': 1, 'delivered': 1, 'refunded': 1}, 
                    sender : {'new': 1, 'in_progress': 1, 'delivered': 1, 'refunded': 1}, 
                    rec : {'new': 1, 'in_progress': 1, 'delivered': 1, 'refunded': 1}
                  }
    this.pet = 'va4';
    this.pet2 = 'va2';
    this.pet3 = 'pending';
    this.pet4 = 'pending';
    this.pet5 = 'pending';  
    this.all_pending = []
    this.all_approved = [];
    this.all_delivered = [];
    this.all_refunded = [];
    this.sender_pending = [];
    this.sender_approved = [];
    this.sender_delivered = [];
    this.sender_refunded = [];
    this.receiver_pending = [];
    this.receiver_approved = [];
    this.receiver_delivered = [];
    this.receiver_refunded = [];
    //this.requestDone = 0;
    this.getData('all', 'new', null, refresher);
    
    
  }

  getData(type, sort, infiniteScroll = null, refresher = null)
  {
    //this.requestDone = 0;
    this._orders.Filter(type, sort, this.pager[type][sort]).subscribe(
      (res) => {
        this.pager[type][sort] = ++this.pager[type][sort];
        let data = JSON.parse(res['_body']).orders.data;
        data.forEach(element => {
          if(sort === 'new' && type === 'all')
            this.all_pending.push(element)
          else if(sort === 'in_progress' && type === 'all')
            this.all_approved.push(element)
          else if(sort === 'delivered' && type === 'all')
            this.all_delivered.push(element)
          else if(sort === 'refunded' && type === 'all')
            this.all_refunded.push(element)
          else if(sort === 'new' && type === 'sender')
            this.sender_pending.push(element)
          else if(sort === 'in_progress' && type === 'sender')
            this.sender_approved.push(element)
          else if(sort === 'delivered' && type === 'sender')
            this.sender_delivered.push(element)
          else if(sort === 'refunded' && type === 'sender')
            this.sender_refunded.push(element)
          else if(sort === 'new' && type === 'rec')
            this.receiver_pending.push(element)
          else if(sort === 'in_progress' && type === 'rec')
            this.receiver_approved.push(element)
          else if(sort === 'delivered' && type === 'rec')
            this.receiver_delivered.push(element)
          else if(sort === 'refunded' && type === 'rec')
            this.receiver_refunded.push(element)
        });
        this.requestDone = 1;
        console.log(`${type} ${sort}:`,data, this.pager[type][sort]);
        if(infiniteScroll != null)
          infiniteScroll.complete();
        if(refresher != null)
          refresher.complete();  
      });
    
  }

  ionViewDidLoad() {
    this.getData('all', 'new');
  }

  myDate(value){
    return value.replace(/\s/g, "T");
  }

  ionViewDidEnter() {
  }


  viewOrder(data: {}) {
    this.navCtrl.push(OrderdetailsPage, { data: data['id'] })
  }


  goToNewOrderPage() {
    this.navCtrl.push(NewOrderPage);
  }

  doInfinite(infiniteScroll, type, sort) {
    this.getData(type, sort, infiniteScroll);
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
