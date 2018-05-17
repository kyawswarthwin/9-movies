import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeriesTabsPage } from './series-tabs';

@NgModule({
  declarations: [
    SeriesTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(SeriesTabsPage),
  ],
})
export class SeriesTabsPageModule {}
