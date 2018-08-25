import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBankPage } from './new-bank';

@NgModule({
  declarations: [
    //NewBankPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBankPage),
  ],
})
export class NewBankPageModule {}
