import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesTabsPage } from './movies-tabs';

@NgModule({
  declarations: [
    MoviesTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesTabsPage),
  ],
})
export class MoviesTabsPageModule {}
