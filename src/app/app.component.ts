import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PARSE_SERVER, HOME_PAGE } from './app.config';
import Parse from 'parse';

export interface PageInterface {
  icon?: string;
  title: string;
  component: any;
}
export interface MenuInterface {
  header?: string;
  pages: PageInterface[];
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  menus: MenuInterface[] = [
    {
      pages: [
        {
          title: 'Movies',
          component: 'MoviesPage'
        },
        {
          title: 'TV Shows',
          component: 'TvShowsPage'
        },
        {
          title: 'Music',
          component: 'MusicPage'
        },
        {
          title: 'TV Channels',
          component: 'TvChannelsPage'
        },
        {
          title: 'Radio Stations',
          component: 'RadioStationsPage'
        },
        {
          title: 'Applications',
          component: 'ApplicationsPage'
        },
        {
          title: 'Games',
          component: 'GamesPage'
        }
      ]
    }
  ];

  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    Parse.initialize(PARSE_SERVER.APP_ID);
    Parse.serverURL = PARSE_SERVER.URL;

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.rootPage = HOME_PAGE;
  }

  openPage(page: PageInterface) {
    this.nav.setRoot(page.component);
  }

  isActive(page: PageInterface): boolean {
    return (
      this.nav.getActive() &&
      this.nav.getActive()._nav['root'] ===
        (typeof page.component === 'string' ? page.component : page.component.name)
    );
  }
}
