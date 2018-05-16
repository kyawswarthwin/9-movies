import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviePlayerPage } from './movie-player';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MoviePlayerPage],
  imports: [IonicPageModule.forChild(MoviePlayerPage), ComponentsModule]
})
export class MoviePlayerPageModule {}
