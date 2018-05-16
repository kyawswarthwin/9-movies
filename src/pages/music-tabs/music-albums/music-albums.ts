import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../../base/base';
import { MusicProvider as Music } from '../../../providers/music/music';

@IonicPage({
  segment: 'music/albums'
})
@Component({
  selector: 'page-music-albums',
  templateUrl: 'music-albums.html'
})
export class MusicAlbumsPage extends BasePage {
  params: any = { field: 'album' };
  albums: any[];
  column: string = 'album';
  direction: string = '';

  constructor(public injector: Injector) {
    super(injector);
  }

  ionViewWillEnter() {
    this.showLoadingView('Loading...');
    this.onReload();
  }

  async loadData() {
    try {
      let data = await Music.listOf(this.params);
      this.albums = this.albums.concat(data);
      this.onRefreshComplete(data);
      if (this.albums.length) {
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
    this.ionViewWillEnter();
  }

  onLoadMore(infiniteScroll: any) {
    this.infiniteScroll = infiniteScroll;
    this.params.page++;
    this.loadData();
  }

  onReload(refresher?: any) {
    this.refresher = refresher;

    this.params.sortBy = `${this.direction}${this.column}`;
    this.params.page = 0;
    this.albums = [];

    this.loadData();
  }
}
