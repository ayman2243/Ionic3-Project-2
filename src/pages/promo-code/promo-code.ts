import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PromocodeProvider } from '../../providers/promocode/promocode';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the PromoCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promo-code',
  templateUrl: 'promo-code.html',
})
export class PromoCodePage {

  dataForm = { code:null };
  actionForm: FormGroup;
  lastCouponInfo: any = {};
  requestDone = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _coupons: PromocodeProvider, private toastCtrl: ToastController,public error_helper:HelperProvider) {
    this.getLastCoupon();
    this.actionForm = new FormGroup({
      'code': new FormControl(this.dataForm.code, [Validators.required])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromoCodePage');
  }

  getLastCoupon()
  {
    this._coupons.Get().subscribe(
      res =>{
          if(res.coupon === 'لا توجد قسيمة تخفيض صالحة.'){
            this.lastCouponInfo.id = 'empty';
            this.requestDone = 2
          }
          else if(res.coupon[0] != 'undefined'){
            this.requestDone = 1
            this.lastCouponInfo = res.coupon[0];
          }else{
            this.lastCouponInfo.id = 'empty';
            this.requestDone = 2
          }
          console.log(res)
        },error =>{
          this.presentToast(this.error_helper.Error_Handler(error));
        }
    );
  }
  Submit(){
    this._coupons.Post(this.dataForm.code).subscribe(
      res => {
        console.log(res);
        this.navCtrl.pop();
      },
      error =>{
        this.presentToast(this.error_helper.Error_Handler(error));
      }
    )
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
