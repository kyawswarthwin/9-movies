import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicGenresPage } from './music-genres';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MusicGenresPage],
  imports: [IonicPageModule.forChild(MusicGenresPage), ComponentsModule]
})
export class MusicGenresPageModule {}
