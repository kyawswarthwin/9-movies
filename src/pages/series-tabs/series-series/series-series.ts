import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../../base/base';
import { SerieProvider as Serie } from '../../../providers/serie/serie';

@IonicPage({
  segment: 'series/series'
})
@Component({
  selector: 'page-series-series',
  templateUrl: 'series-series.html'
})
export class SeriesSeriesPage extends BasePage {
  params: any = { field: 'album' };
  series: any[];
  column: string = 'album';
  direction: string = '';

  constructor(public injector: Injector) {
    super(injector);

    this.params = { ...this.params, ...this.navParams.data };
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
      let data = await Serie.listOf(this.params);
      this.series = this.series.concat(data);
      this.onRefreshComplete(data);
      if (this.series.length) {
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
    this.series = [];

    this.loadData();
  }
}
