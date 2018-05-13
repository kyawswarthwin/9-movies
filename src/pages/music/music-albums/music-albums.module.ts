import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicAlbumsPage } from './music-albums';

@NgModule({
  declarations: [
    MusicAlbumsPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicAlbumsPage),
  ],
})
export class MusicAlbumsPageModule {}
