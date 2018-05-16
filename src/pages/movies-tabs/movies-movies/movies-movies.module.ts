import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesMoviesPage } from './movies-movies';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MoviesMoviesPage],
  imports: [IonicPageModule.forChild(MoviesMoviesPage), ComponentsModule]
})
export class MoviesMoviesPageModule {}
