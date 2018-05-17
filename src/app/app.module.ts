import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { MovieProvider } from '../providers/movie/movie';
import { SerieProvider } from '../providers/serie/serie';
import { MusicProvider } from '../providers/music/music';
import { ChannelProvider } from '../providers/channel/channel';
import { StationProvider } from '../providers/station/station';
import { ApplicationProvider } from '../providers/application/application';
import { GameProvider } from '../providers/game/game';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
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
    MovieProvider,
    SerieProvider,
    MusicProvider,
    ChannelProvider,
    StationProvider,
    ApplicationProvider,
    GameProvider
  ]
})
export class AppModule {}
