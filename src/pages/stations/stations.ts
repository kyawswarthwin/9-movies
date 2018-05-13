import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../base/base';
import { StationProvider as Station } from '../../providers/station/station';

@IonicPage({
  segment: 'stations'
})
@Component({
  selector: 'page-stations',
  templateUrl: 'stations.html'
})
export class StationsPage extends BasePage {
  params: any = {};
  stations: Station[];
  column: string = 'name';
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
      let data = await Station.load(this.params);
      this.stations = this.stations.concat(data);
      this.onRefreshComplete(data);
      if (this.stations.length) {
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
    this.stations = [];

    this.loadData();
  }
}
