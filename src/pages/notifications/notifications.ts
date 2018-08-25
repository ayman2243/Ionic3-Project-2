import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController } from 'ionic-angular';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notifications: any;
  requestDone = 0;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController , public navParams: NavParams, public _notify: NotificationsProvider,private toastCtrl: ToastController ,public error_helper:HelperProvider) {
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
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

  ionViewDidEnter(){
    
  }

  ionViewWillEnter(){
   this.GetNotifications()
  }


  GetNotifications(refresher = null){
    this._notify.Get().subscribe(res =>{

      this.notifications = res.notifications; console.log(this.notifications);
      
      // let ReDesignObject = [];
      // this.notifications.forEach((element, index) => {
      //   console.log(index, element.created_at.split(' ')[0]);
      // });
      
      this.notifications = this.notifications.filter((it) =>
      {
        return it.type == 'notification'
      });
      console.log(this.notifications);
      this.requestDone = 1;
      if(refresher != null)
        refresher.complete();
    },error=>{
      this.requestDone = 1;
      this.presentToast(this.error_helper.Error_Handler(error));
    })
  }
  myDate(value){
    return value.replace(/\s/g, "T");
  }

  doRefresh(refresher) {
    this.GetNotifications(refresher)
  }

}
