import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewOrderPage } from '../new-order/new-order';

/**
 * Generated class for the Orders1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders1',
  templateUrl: 'orders1.html',
})
export class Orders1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Orders1Page');
  }
  goToNewOrderPage(){
    this.navCtrl.push(NewOrderPage);
  }

}
