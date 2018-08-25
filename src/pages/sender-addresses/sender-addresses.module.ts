import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SenderAddressesPage } from './sender-addresses';

@NgModule({
  declarations: [
    //SenderAddressesPage,
  ],
  imports: [
    IonicPageModule.forChild(SenderAddressesPage),
  ],
})
export class SenderAddressesPageModule {}
