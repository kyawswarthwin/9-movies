import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicSongsPage } from './music-songs';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MusicSongsPage],
  imports: [IonicPageModule.forChild(MusicSongsPage), ComponentsModule]
})
export class MusicSongsPageModule {}
