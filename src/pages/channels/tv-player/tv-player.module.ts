import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TvPlayerPage } from './tv-player';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [TvPlayerPage],
  imports: [IonicPageModule.forChild(TvPlayerPage), ComponentsModule]
})
export class TvPlayerPageModule {}
