import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';

/**
 * Generated class for the ModalApprovementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-approvement',
  templateUrl: 'modal-approvement.html',
})
export class ModalApprovementPage {
  collect = 0;
  data: any;
  discount = 0;
  extra = 0;
  services=[];
  totalPrice:any;
  constructor(public navCtrl: NavController, private View: ViewController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
    
    // if( this.data.order.extra_service)
    // this.extra = 5;
    // this.totalPrice=(Number(this.data.order.price)-(Number(this.data.order.price)) * this.discount )+ this.extra;
    // console.log( this.navParams.get('data') );
    if( this.data.order.services != null){
      this.services = this.data.order.services;
    }
    this.services.forEach((e,i)=>{
      this.extra += Number(e.amount) || 0;
    });

    
    this.collect = (this.data.order.collect)?parseInt(this.data.order.collect): 0;

    if( this.data.order.discount > 0)
      this.discount = (Number(this.data.order.price) + this.extra) * (Number(this.data.order.discount)/100.0) ;

    this.totalPrice = (Number(this.data.order.price) + Number(this.extra) ) - Number(this.discount)  ;
    console.log( this.navParams.get('data') );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalApprovementPage');
  }
  closeModal() {
    this.View.dismiss({hello:'my data'})
  }
  newOrder(){
    this.View.dismiss({newOrder:true});
  }
}
