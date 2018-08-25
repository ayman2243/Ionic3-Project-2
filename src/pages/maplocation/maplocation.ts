import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SettingsProvider } from '../../providers/settings/settings';
declare var google;

/**
 * Generated class for the MaplocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maplocation',
  templateUrl: 'maplocation.html',
})
export class MaplocationPage {
  
  map;
  userlat = -34.397;  
  userlng = 150.644;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _settings: SettingsProvider, public toastCtrl: ToastController, public platform: Platform, public viewCtrl: ViewController, private geolocation: Geolocation) {
    if( this.navParams.get('lat') && this.navParams.get('lng')){
      this.userlat = Number(this.navParams.get('lat'));
      this.userlng = Number(this.navParams.get('lng'));
    }
  }

  initMap(){
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.userlat, lng: this.userlng},
      zoom: 16,
      disableDefaultUI: true
    });
  }

  ionViewDidLoad(){
    if( this.navParams.get('lat') && this.navParams.get('lng') && this.navParams.get('lat') != '0' && this.navParams.get('lng') != '0'){
    }else{
      setTimeout(() => {
        this.GPSlocation();
      }, 1000);
    }
    setTimeout(() => {
      this.initMap();
    }, 500);
  }

  GPSlocation(){
    this.platform.ready().then(() => {

      // if(this.platform.is('android')){
      //   (<any>window).Location.Provider.getLastKnownLocation(
      //   (location) =>{
      //     this.userlat = Number(location.latitude);
      //     this.userlng = Number(location.longitude);
      //     var latLng = new google.maps.LatLng(this.userlat, this.userlng);
      //     this.map.setCenter(latLng);
      //   },() => {
      //     this.presentToast('حدث خطأ، من فضلك تاكد من فتح ال جي بي اس او حاول مجددا');
      //   });
      // }else{
        let message = this.presentToast('جاري الحصول علي موقعك الحالي', 20000);
        let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
        this.geolocation.getCurrentPosition(options).then((resp) => {
          this.userlat = Number(resp.coords.latitude);
          this.userlng = Number(resp.coords.longitude);
          var latLng = new google.maps.LatLng(this.userlat, this.userlng);
          this.map.setCenter(latLng);
          message.dismiss();
         }).catch((error) => {
          message.dismiss();
          this.presentToast('حدث خطأ، من فضلك تاكد من فتح ال جي بي اس او حاول مجددا');
         });
      // }
    });
  }
  GetMyCurrentLocation(){
    this.GPSlocation();
  }

  dismiss() {
    // let latlng = { lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() }
    // let geocoder = new google.maps.Geocoder;
    let location = this.map.getCenter().lat()+','+this.map.getCenter().lng();
    let formatted_address = this.map.getCenter().lat()+','+this.map.getCenter().lng();
    this._settings.GetFormattedAddress(location).subscribe(
      res =>{
        formatted_address = res.results[0].formatted_address;
        let data = { lat: this.map.getCenter().lat(), long:  this.map.getCenter().lng(), formatted_address: formatted_address};
        this.viewCtrl.dismiss(data);
      },
      err =>{
        let data = { lat: this.map.getCenter().lat(), long:  this.map.getCenter().lng(), formatted_address: formatted_address};
        this.viewCtrl.dismiss(data);
      }
    );
  }

  presentToast(m, t = null) {
    let toast = this.toastCtrl.create({
      message: m,
      duration: t || 5000,
      position: 'bottom',
      cssClass: "toast",
    });
    toast.present();
    return toast;
  }
}
