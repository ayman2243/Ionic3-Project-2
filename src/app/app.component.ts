//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import * as $ from "jquery";
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { BillingPage } from '../pages/billing/billing';
import { AddressesManagementPage } from '../pages/addresses-management/addresses-management';
import { CallUsPage } from '../pages/call-us/call-us';
import { ReportsPage } from '../pages/reports/reports';
import { BanksPage } from '../pages/banks/banks';
import { ProfileProvider } from '../providers/profile/profile';
import { Firebase } from '@ionic-native/firebase';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  templateUrl: 'app.html',
  providers: [Keyboard]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroPage;
  appV;
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar, public fcm: Firebase, splashScreen: SplashScreen, public keyboard: Keyboard, public _profile: ProfileProvider, public appVersion: AppVersion ) {

    // Production Server: https://s01.secure.sourcya.net:8000/api
    // Develop Serve: http://dev01.dev.sourcya.net:9400/api
    localStorage.setItem('apiUrl', /*'/dev/api'*/ 'https://s01.secure.sourcya.net:8000/api')

    if (localStorage.getItem('token')) {
      this._profile.Get().subscribe(res => {
        let isActive = JSON.parse(res['_body']).user.active;
        if (isActive == 0) {
          localStorage.removeItem('token');
          this.rootPage = IntroPage;
        } else {
          this.rootPage = TabsPage;
        }
      });
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#37266e');
      statusBar.styleLightContent();
      splashScreen.hide();


     this.appVersion.getVersionNumber().then((res) =>{
        this.appV = res;
      }).catch((err) =>{
        // alert("Can't define the app version.")
      });

      this.keyboard.onKeyboardShow().subscribe(() => {
        $(document).ready(function () {
          $('.vertical-align-content').find('*').css({ "display": "block!important" });
        });
      });

      this.keyboard.onKeyboardHide().subscribe(() => {
        $(document).ready(function () {
          $('.vertical-align-content').find('*').css({ "display": "flex!important" });
        });
      });

    });
    
    this.pages = [
      { title: 'لوحة التحكم', component: TabsPage },
      { title: 'طلبات الشحن', component: TabsPage },
      { title: 'إدارة العناوين', component: AddressesManagementPage },
      { title: 'حسابي', component: BillingPage },
      { title: 'الإشعارات', component: TabsPage },
      { title: 'اعدادات البنك', component: BanksPage },
      { title: 'التقارير', component: ReportsPage },
      { title: 'اتصل بنــا', component: CallUsPage }
    ];

  }


  

  openPage(page) {

    if (page.title == 'طلبات الشحن') {
      this.nav.push(page.component, { tabIndex: 2 });
    }
    else if (page.title == 'حسابي') {
      this.nav.push(page.component, { tabIndex: 4 });
    }
    else if (page.title == 'الإشعارات') {
      this.nav.push(page.component, { tabIndex: 3 });
    }
    else {
      this.nav.push(page.component);
    }

  }

  newOrder() {
    this.nav.push(TabsPage);
  }
}
