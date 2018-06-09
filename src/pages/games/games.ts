import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../base/base';
import { GameProvider as Game } from '../../providers/game/game';

@IonicPage({
  segment: 'games'
})
@Component({
  selector: 'page-games',
  templateUrl: 'games.html'
})
export class GamesPage extends BasePage {
  params: any = {};
  games: Game[];
  column: string = 'updatedAt';
  direction: string = '-';

  constructor(public injector: Injector) {
    super(injector);
  }

  ionViewWillEnter() {
    this.showLoadingView('Loading...');
    this.onReload();
  }

  async loadData() {
    try {
      let data = await Game.load(this.params);
      this.games = this.games.concat(data);
      this.onRefreshComplete(data);
      if (this.games.length) {
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
    this.games = [];

    this.loadData();
  }
}
