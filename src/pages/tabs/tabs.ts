import { Component } from '@angular/core';
import { NavParams, MenuController, Tab, NavController, Platform } from 'ionic-angular';
import { MyAccountPage } from '../../pages/my-account/my-account';
import { Orders1Page } from '../../pages/orders1/orders1';
import { NotificationsPage } from '../../pages/notifications/notifications';
import { AOrdersPage } from '../../pages/a-orders/a-orders';
import { Firebase } from '@ionic-native/firebase';
import { ProfileProvider } from '../../providers/profile/profile';
import { IntroPage } from '../../pages/intro/intro';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MyAccountPage;
  tab2Root = Orders1Page;
  tab3Root = AOrdersPage;
  tab4Root = NotificationsPage;

  tabIndex: any = 1;

  constructor(public navParams: NavParams, public menu: MenuController, public navCtrl: NavController, public fcm: Firebase, public _profile: ProfileProvider, public platform: Platform) {
    if(this.navParams.get('tabIndex')){
      this.tabIndex = this.navParams.get('tabIndex');
    }else{
      this.tabIndex = 1
    }
    this.updateFCM();
  }
  ionViewDidEnter(){
    if(this.navParams.get('tabIndex')){
      this.tabIndex = this.navParams.get('tabIndex');
    }else{
      this.tabIndex = 1
    }
  }
  
  newNotification(){
    var notifications = (localStorage.getItem('newNotifications'))? localStorage.getItem('newNotifications'): false;
    return notifications;
  }

  tabSelected(tab: Tab) {
    if(tab.index === 3){
      localStorage.removeItem('newNotifications');
    }
  }

  updateFCM(){
    this.platform.ready().then(() => {
      this.fcm.onNotificationOpen().subscribe(data => {
        if (data.wasTapped) {
          //alert(JSON.stringify(data));
        } else {
          if (data.type == "block") {
            localStorage.removeItem('token');
            this.navCtrl.setRoot(IntroPage);
          }else if(data.type == "notification"){
            var notification = (localStorage.getItem('newNotifications')) ? Number(localStorage.getItem('newNotifications')) + 1: 1;
            localStorage.setItem('newNotifications', notification.toString())
          }
        };
      });
      this.fcm.getToken().then(token => {
        this._profile.fcm(token).subscribe(res => { console.log(res) });
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        this._profile.fcm(token).subscribe(res => { console.log(res) });
      });

      if(this.platform.is('ios')){
        this.fcm.grantPermission().then((done) =>{
          console.log(done);
        }, (err) =>{
          console.log(err);
        });
      }
    });
  }


  ionViewDidLoad() {
    this.menu.enable(true, 'rightMenu');
    console.log('ionViewDidLoad TabsPage');
    console.log(this.tabIndex);
    
    if(this.navParams.get('tabIndex')){
      this.tabIndex = this.navParams.get('tabIndex');
    }else{
      this.tabIndex = 1
    }
  }
}
