import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-music',
  templateUrl: 'music.html'
})
export class MusicPage {
  tab1Root: any = 'MusicSongsPage';
  tab2Root: any = 'MusicArtistsPage';
  tab3Root: any = 'MusicAlbumsPage';
  tab4Root: any = 'MusicGenresPage';

  constructor() {}
}
