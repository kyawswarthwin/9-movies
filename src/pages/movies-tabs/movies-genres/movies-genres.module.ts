import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesGenresPage } from './movies-genres';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MoviesGenresPage],
  imports: [IonicPageModule.forChild(MoviesGenresPage), ComponentsModule]
})
export class MoviesGenresPageModule {}
