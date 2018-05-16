import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicTabsPage } from './music-tabs';

@NgModule({
  declarations: [
    MusicTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicTabsPage),
  ],
})
export class MusicTabsPageModule {}
