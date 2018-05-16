import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicAlbumsPage } from './music-albums';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MusicAlbumsPage],
  imports: [IonicPageModule.forChild(MusicAlbumsPage), ComponentsModule]
})
export class MusicAlbumsPageModule {}
