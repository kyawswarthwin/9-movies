import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicArtistsPage } from './music-artists';

@NgModule({
  declarations: [
    MusicArtistsPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicArtistsPage),
  ],
})
export class MusicArtistsPageModule {}
