import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TvPlayerPage } from './tv-player';

@NgModule({
  declarations: [
    TvPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(TvPlayerPage),
  ],
})
export class TvPlayerPageModule {}
