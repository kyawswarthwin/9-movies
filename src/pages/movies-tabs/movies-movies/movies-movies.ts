import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../../base/base';
import { MovieProvider as Movie } from '../../../providers/movie/movie';

@IonicPage({
  segment: 'movies/movies'
})
@Component({
  selector: 'page-movies-movies',
  templateUrl: 'movies-movies.html'
})
export class MoviesMoviesPage extends BasePage {
  params: any = {};
  movies: Movie[];
  column: string = 'updatedAt';
  direction: string = '-';

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

  ionViewDidLoad() {
    this.showLoadingView('Loading...');
    this.onReload();
  }

  async loadData() {
    try {
      let data = await Movie.load(this.params);
      this.movies = this.movies.concat(data);
      this.onRefreshComplete(data);
      if (this.movies.length) {
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
    this.movies = [];

    this.loadData();
  }
}
