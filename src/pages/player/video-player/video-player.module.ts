import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoPlayerPage } from './video-player';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [VideoPlayerPage],
  imports: [IonicPageModule.forChild(VideoPlayerPage), ComponentsModule]
})
export class VideoPlayerPageModule {}
