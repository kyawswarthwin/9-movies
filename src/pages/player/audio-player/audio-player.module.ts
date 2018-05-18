import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioPlayerPage } from './audio-player';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [AudioPlayerPage],
  imports: [IonicPageModule.forChild(AudioPlayerPage), ComponentsModule]
})
export class AudioPlayerPageModule {}
