import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the CallUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-us',
  templateUrl: 'call-us.html',
})
export class CallUsPage {

  preloader = true;
  about = {
                        app_name: 'Glencee',
                        str_1: 'string',
                        str_2: 'string',
                        city: 'Jeddah',
                        country: 'Saudi Arabia',
                        website: 'http://glencee.com',
                        support_email: 'support@glence.com',
                        support_desc: 'لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص.',
                        support_hotline: '009665719789172',
                        facebook: 'https://facebook.com',
                        twitter: 'https://twitter.com',
                        youtube: 'https://youtube.com',
                        instagram: 'https://instagram.com',
                        linkedin: 'https://linkedin.com',
                      };
  constructor(public navCtrl: NavController,private toastCtrl: ToastController, public navParams: NavParams, public _settings: SettingsProvider, public error_helper:HelperProvider) {
  this._settings.aboutUS().subscribe((res) =>{
    this.preloader = false;
    this.about = JSON.parse(res['_body']).about;
  }, err =>{
    this.presentToast(this.error_helper.Error_Handler(err));
  })
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallUsPage');
  }

}
