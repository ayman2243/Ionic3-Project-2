//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from "@angular/core";
import { AppModule } from './app.module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
