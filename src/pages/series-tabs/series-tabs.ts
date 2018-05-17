import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'series'
})
@Component({
  selector: 'page-series-tabs',
  templateUrl: 'series-tabs.html'
})
export class SeriesTabsPage {
  tab1Root: any = 'SeriesSeriesPage';
  tab2Root: any = 'SeriesGenresPage';
  tab3Root: any = 'SeriesYearsPage';

  constructor() {}
}
