import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BanksPage } from './banks';

@NgModule({
  declarations: [
    //BanksPage,
  ],
  imports: [
    IonicPageModule.forChild(BanksPage),
  ],
})
export class BanksPageModule {}
