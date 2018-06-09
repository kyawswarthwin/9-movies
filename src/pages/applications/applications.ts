import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../base/base';
import { ApplicationProvider as Application } from '../../providers/application/application';

@IonicPage({
  segment: 'applications'
})
@Component({
  selector: 'page-applications',
  templateUrl: 'applications.html'
})
export class ApplicationsPage extends BasePage {
  params: any = {};
  applications: Application[];
  column: string = 'updatedAt';
  direction: string = '-';

  constructor(public injector: Injector) {
    super(injector);
  }

  ionViewDidLoad() {
    this.showLoadingView('Loading...');
    this.onReload();
  }

  async loadData() {
    try {
      let data = await Application.load(this.params);
      this.applications = this.applications.concat(data);
      this.onRefreshComplete(data);
      if (this.applications.length) {
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
    this.applications = [];

    this.loadData();
  }
}
