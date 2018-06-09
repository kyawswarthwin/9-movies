import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../base/base';
import { ChannelProvider as Channel } from '../../providers/channel/channel';

@IonicPage({
  segment: 'channels'
})
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html'
})
export class ChannelsPage extends BasePage {
  params: any = {};
  channels: Channel[];
  column: string = 'name';
  direction: string = '';

  constructor(public injector: Injector) {
    super(injector);
  }

  ionViewDidLoad() {
    this.showLoadingView('Loading...');
    this.onReload();
  }

  async loadData() {
    try {
      let data = await Channel.load(this.params);
      this.channels = this.channels.concat(data);
      this.onRefreshComplete(data);
      if (this.channels.length) {
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

  onLoadMore(infiniteScroll: any) {
    this.infiniteScroll = infiniteScroll;
    this.params.page++;
    this.loadData();
  }

  onReload(refresher?: any) {
    this.refresher = refresher;

    this.params.sortBy = `${this.direction}${this.column}`;
    this.params.page = 0;
    this.channels = [];

    this.loadData();
  }
}
