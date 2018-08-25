import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionsPage } from './transactions';
import { PopoverController } from 'ionic-angular';

@NgModule({
  declarations: [
    //TransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionsPage),
  ],
})
export class TransactionsPageModule {
  constructor(public popoverCtrl: PopoverController) {}

 
}
