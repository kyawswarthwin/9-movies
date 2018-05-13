import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicGenresPage } from './music-genres';

@NgModule({
  declarations: [
    MusicGenresPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicGenresPage),
  ],
})
export class MusicGenresPageModule {}
