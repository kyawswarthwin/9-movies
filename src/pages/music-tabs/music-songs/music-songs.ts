import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../../base/base';
import { MusicProvider as Music } from '../../../providers/music/music';

@IonicPage({
  segment: 'music/songs'
})
@Component({
  selector: 'page-music-songs',
  templateUrl: 'music-songs.html'
})
export class MusicSongsPage extends BasePage {
  params: any = {};
  songs: Music[];
  column: string = 'updatedAt';
  direction: string = '';

  constructor(public injector: Injector) {
    super(injector);

    this.params = this.navParams.data;
    if (this.params.sortBy) {
      let sortBy = this.params.sortBy;
      if (sortBy.charAt(0) === '-') {
        sortBy = sortBy.substr(1);
        this.direction = '-';
      }
      this.column = sortBy;
    }
  }

  ionViewWillEnter() {
    this.showLoadingView('Loading...');
    this.onReload();
  }

  async loadData() {
    try {
      let data = await Music.load(this.params);
      this.songs = this.songs.concat(data);
      this.onRefreshComplete(data);
      if (this.songs.length) {
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
    this.songs = [];

    this.loadData();
  }
}
