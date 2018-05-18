import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../../base/base';
import { SerieProvider as Serie } from '../../../providers/serie/serie';

@IonicPage({
  segment: 'series/series/:title',
  defaultHistory: ['SeriesSeriesPage']
})
@Component({
  selector: 'page-serie-detail',
  templateUrl: 'serie-detail.html'
})
export class SerieDetailPage extends BasePage {
  title: string;
  series: any[];

  constructor(public injector: Injector) {
    super(injector);

    this.title = this.navParams.data.title;
  }

  async ionViewDidLoad() {
    try {
      this.showLoadingView('Loading...');
      let data = await Serie.listOf(this.params);
      this.series = data;
      this.showContentView();
    } catch (error) {
      this.showErrorView();
    }
  }
}
