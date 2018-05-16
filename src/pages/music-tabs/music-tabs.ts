import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'music'
})
@Component({
  selector: 'page-music-tabs',
  templateUrl: 'music-tabs.html'
})
export class MusicTabsPage {
  tab1Root: any = 'MusicSongsPage';
  tab2Root: any = 'MusicArtistsPage';
  tab3Root: any = 'MusicAlbumsPage';
  tab4Root: any = 'MusicGenresPage';

  constructor() {}
}
