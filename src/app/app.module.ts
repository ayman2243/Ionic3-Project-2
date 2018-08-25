//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// import { AccountPage } from '../pages/account/account';
import { HomePage } from '../pages/home/home';
import { Login1Page } from '../pages/login1/login1';
// import { Login3Page } from '../pages/login3/login3';
import { Login2Page } from '../pages/login2/login2';
import { TabsPage } from '../pages/tabs/tabs';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { Orders1Page } from '../pages/orders1/orders1';
import { AOrdersPage } from '../pages/a-orders/a-orders';
import { NotificationsPage } from '../pages/notifications/notifications';
import { BankAccountPage } from '../pages/bank-account/bank-account';
import { PromoCodePage } from '../pages/promo-code/promo-code';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroPage } from '../pages/intro/intro';
import { NewOrderPage } from '../pages/new-order/new-order';
import { MyAccountPage } from '../pages/my-account/my-account';
import { AddressesPage } from '../pages/addresses/addresses';
import { BillingPage } from '../pages/billing/billing';
import { VerificationPage, FormatTimePipe } from '../pages/verification/verification';
import { ModalApprovementPage } from '../pages/modal-approvement/modal-approvement';
import { AddressesManagementPage } from '../pages/addresses-management/addresses-management';
import { EditFormPage } from '../pages/edit-form/edit-form';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { CallUsPage } from '../pages/call-us/call-us';
import { SenderAddressesPage } from '../pages/sender-addresses/sender-addresses';
import { AddressEditFormPage } from '../pages/address-edit-form/address-edit-form';
//import { SenderEditFormPage } from '../pages/sender-edit-form/sender-edit-form';
import { SingnupmapPage } from '../pages/singnupmap/singnupmap';
import { ReportsPage } from '../pages/reports/reports';
import { HttpModule } from '@angular/http';
import { AuthProvider } from '../providers/auth/auth';
import { MaplocationPage } from '../pages/maplocation/maplocation'
import { Geolocation } from '@ionic-native/geolocation';
import { SettingsProvider } from '../providers/settings/settings';
import { WithdrawProvider } from '../providers/withdraw/withdraw';
import { AddressesProvider } from '../providers/addresses/addresses';
import { ProfileProvider } from '../providers/profile/profile';
import { OrdersProvider } from '../providers/orders/orders';
import { BillsProvider } from '../providers/bills/bills';
import { AddOtherAddressPage } from '../pages/add-other-address/add-other-address';
import { EditOtherAddressesPage } from '../pages/edit-other-addresses/edit-other-addresses';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { OrderdetailsPage } from '../pages/orderdetails/orderdetails';
import { TransactionsPage } from '../pages/transactions/transactions';
import { NewTransactionPage } from '../pages/new-transaction/new-transaction';
import { BanksPage } from '../pages/banks/banks';
import { NewBankPage } from '../pages/new-bank/new-bank';
import { EditBankPage } from '../pages/edit-bank/edit-bank';
import { ReportProvider } from '../providers/report/report';
import { Firebase } from '@ionic-native/firebase';
import { TransactionProvider } from '../providers/transaction/transaction'
import { PromocodeProvider } from '../providers/promocode/promocode';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { ErrorhandlerProvider } from '../providers/errorhandler/errorhandler';
import { HelperProvider } from '../providers/helper/helper';
import{ ChangePhoneNumberPage } from '../pages/change-phone-number/change-phone-number';
import { AppVersion } from '@ionic-native/app-version';


@NgModule({
  declarations: [
    MyApp,
    // AccountPage,
    HomePage,
    TabsPage,
    Login1Page,
    Login2Page,
    // Login3Page,
    FormatTimePipe,
    IntroPage,
    ForgetPasswordPage,
    Orders1Page,
    NewOrderPage,
    NotificationsPage,
    BankAccountPage,
    PromoCodePage,
    MyAccountPage,
    NotificationsPage,
    AddressesPage,
    BillingPage,
    AOrdersPage,
    VerificationPage,
    ModalApprovementPage,
    AddressesManagementPage,
    EditFormPage,
    ChangePasswordPage,
    CallUsPage,
    SenderAddressesPage,
    AddressEditFormPage,
   // SenderEditFormPage,
    ReportsPage,
    SingnupmapPage,
    MaplocationPage,
    AddOtherAddressPage,
    EditOtherAddressesPage,
    ResetpasswordPage,
    OrderdetailsPage,
    TransactionsPage, 
    NewTransactionPage, 
    BanksPage, 
    NewBankPage, 
    EditBankPage,
    ChangePhoneNumberPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
        mode: 'md',
        scrollAssist: false,
        autoFocusAssist: false,
        backButtonIcon:'ios-arrow-back-outline',
      }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // AccountPage,
    HomePage,
    TabsPage,
    Login1Page,
    Login2Page,
    // Login3Page,
    IntroPage,
    ForgetPasswordPage,
    Orders1Page,
    NewOrderPage,
    NotificationsPage,
    BankAccountPage,
    PromoCodePage,
    MyAccountPage,
    NotificationsPage,
    AddressesPage,
    AOrdersPage,
    VerificationPage,
    BillingPage,
    ModalApprovementPage,
    AddressesManagementPage,
    EditFormPage,
    ChangePasswordPage,
    CallUsPage,
    SenderAddressesPage,
    AddressEditFormPage,
   // SenderEditFormPage,
    ReportsPage,
    SingnupmapPage,
    MaplocationPage,
    AddOtherAddressPage,
    EditOtherAddressesPage,
    ResetpasswordPage,
    OrderdetailsPage,
    TransactionsPage, 
    NewTransactionPage, 
    BanksPage, 
    NewBankPage, 
    EditBankPage,
    ChangePhoneNumberPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    Geolocation,
    SettingsProvider,
    WithdrawProvider,
    AddressesProvider,
    ProfileProvider,
    OrdersProvider,
    BillsProvider,
    ReportProvider,
    TransactionProvider,
    PromocodeProvider,
    NotificationsProvider,
    ErrorhandlerProvider,
    HelperProvider,
    AppVersion
  ]
})
export class AppModule { }
// export class MyModule { }
