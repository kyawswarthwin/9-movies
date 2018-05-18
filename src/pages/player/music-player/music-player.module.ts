import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicPlayerPage } from './music-player';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MusicPlayerPage],
  imports: [IonicPageModule.forChild(MusicPlayerPage), ComponentsModule]
})
export class MusicPlayerPageModule {}
