import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicArtistsPage } from './music-artists';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MusicArtistsPage],
  imports: [IonicPageModule.forChild(MusicArtistsPage), ComponentsModule]
})
export class MusicArtistsPageModule {}
