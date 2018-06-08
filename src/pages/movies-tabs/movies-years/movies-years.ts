import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../../base/base';
import { MovieProvider as Movie } from '../../../providers/movie/movie';

@IonicPage({
  segment: 'movies/years'
})
@Component({
  selector: 'page-movies-years',
  templateUrl: 'movies-years.html'
})
export class MoviesYearsPage extends BasePage {
  params: any = { field: 'year' };
  years: any[];
  column: string = 'year';
  direction: string = '1';

  constructor(public injector: Injector) {
    super(injector);
  }

  ionViewWillEnter() {
    this.showLoadingView('Loading...');
    this.onReload();
  }

  async loadData() {
    try {
      let data = await Movie.listOf(this.params);
      this.years = this.years.concat(data);
      this.onRefreshComplete(data);
      if (this.years.length) {
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

  onReload(refresher?: any) {
    this.refresher = refresher;

    this.params.sort = this.direction;
    this.years = [];

    this.loadData();
  }
}
