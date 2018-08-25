import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  reports = {start: null, end: null ,email:'', orders: false, withdraws: false};
  formgroup:FormGroup;
  constructor(public navCtrl: NavController,
     public navParams: NavParams ,
      public formbuilder :FormBuilder ,
      public toastCtrl: ToastController,
      public _report:ReportProvider,public error_helper:HelperProvider) {
      this.formgroup = new FormGroup({
      'start': new FormControl(this.reports.start, [Validators.required]),
      'end': new FormControl(this.reports.end, Validators.required),
      'email': new FormControl(this.reports.email, Validators.required),
      'orders': new FormControl(this.reports.orders),
      'withdraws': new FormControl(this.reports.withdraws)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }

  validDate()
  {
    if(this.reports.start > this.reports.end)
    {
      this.presentToast('برجاء التأكد من التاريخ');
      // let toast = this.toastCtrl.create({
      //   message: 'Error, Invalid date!',
      //   duration: 3000
      // });
      // toast.present();
      //error
      this.formgroup.controls.end.setErrors({value: 'invalid'})
      //toast mess
      
    }
  }
  sendreport(){
    if(this.reports.orders == false && this.reports.withdraws == false){
      this.presentToast('برجاء اختيار التقارير');
      // let toast = this.toastCtrl.create({
      //   message: 'برجاء اختيار التقارير',
      //   duration: 3000
      // });
      // toast.present();
      //error
      this.formgroup.controls.end.setErrors({value: 'invalid'})
      //toast mess
    }
    else
    {
      // send your request here ....
      let x = this.reports.start.split('-');
      this.reports.start = x[0]+'/'+x[1]+'/'+x[2];

      let y = this.reports.end.split('-');
      this.reports.end = y[0]+'/'+y[1]+'/'+y[2];

      console.log('my data', this.reports)
      
      this._report.send(this.reports.start,this.reports.end,this.reports.email,this.reports.orders,this.reports.withdraws).subscribe(
        res => 
        { 
          console.log(res);
          this.reports.start = null;
          this.reports.end = null;
          this.navCtrl.pop();
        }
        ,error =>
        {
          this.presentToast(this.error_helper.Error_Handler(error));
          this.reports.start = null;
          this.reports.end = null;
        }
      )
    }
  }
  presentToast(ms) {
    let toast = this.toastCtrl.create({
      message: ms,
      duration: 3000,
      position: 'bottom',
      cssClass: "toast",
    });
    toast.present();
  }

}
