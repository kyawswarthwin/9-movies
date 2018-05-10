import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { ApplicationProvider } from '../providers/application/application';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StatusBar,
    SplashScreen,
    ApplicationProvider
  ]
})
export class AppModule {}
