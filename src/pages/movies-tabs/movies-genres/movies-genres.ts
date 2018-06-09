import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../../base/base';
import { MovieProvider as Movie } from '../../../providers/movie/movie';

@IonicPage({
  segment: 'movies/genres'
})
@Component({
  selector: 'page-movies-genres',
  templateUrl: 'movies-genres.html'
})
export class MoviesGenresPage extends BasePage {
  params: any = { field: 'genre' };
  genres: any[];
  column: string = 'genre';
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
      let data = await Movie.listOf(this.params);
      this.genres = this.genres.concat(data);
      this.onRefreshComplete(data);
      if (this.genres.length) {
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
    this.genres = [];

    this.loadData();
  }
}
