import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'movies'
})
@Component({
  selector: 'page-movies-tabs',
  templateUrl: 'movies-tabs.html'
})
export class MoviesTabsPage {
  tab1Root: any = 'MoviesMoviesPage';
  tab2Root: any = 'MoviesGenresPage';
  tab3Root: any = 'MoviesYearsPage';

  constructor() {}
}
