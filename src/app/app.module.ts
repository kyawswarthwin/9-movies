import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { ApplicationProvider } from '../providers/application/application';
import { GameProvider } from '../providers/game/game';
import { ChannelProvider } from '../providers/channel/channel';
import { StationProvider } from '../providers/station/station';
import { MusicProvider } from '../providers/music/music';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    ApplicationProvider,
    GameProvider,
    ChannelProvider,
    StationProvider,
    MusicProvider
  ]
})
export class AppModule {}
