import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../../base/base';
import { MusicProvider as Music } from '../../../providers/music/music';

@IonicPage({
  segment: 'music/artists'
})
@Component({
  selector: 'page-music-artists',
  templateUrl: 'music-artists.html'
})
export class MusicArtistsPage extends BasePage {
  params: any = { field: 'artist' };
  artists: any[];
  column: string = 'artist';
  direction: string = '1';

  constructor(public injector: Injector) {
    super(injector);
  }

  ionViewDidLoad() {
    this.showLoadingView('Loading...');
    this.onReload();
  }

  async loadData() {
    try {
      let data = await Music.listOf(this.params);
      this.artists = this.artists.concat(data);
      this.onRefreshComplete(data);
      if (this.artists.length) {
        this.showContentView();
      } else {
        this.showEmptyView();
      }
    } catch (error) {
      this.onRefreshComplete();
      this.showErrorView();
    }
  }

  onSearch() {
    this.showLoadingView('Searching...');
    this.onReload();
  }

  onClearSearch() {
    this.params.search = '';
    this.ionViewDidLoad();
  }

  onReload(refresher?: any) {
    this.refresher = refresher;

    this.params.sort = this.direction;
    this.artists = [];

    this.loadData();
  }
}
