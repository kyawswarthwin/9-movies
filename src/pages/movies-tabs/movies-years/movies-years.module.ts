import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesYearsPage } from './movies-years';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MoviesYearsPage],
  imports: [IonicPageModule.forChild(MoviesYearsPage), ComponentsModule]
})
export class MoviesYearsPageModule {}
