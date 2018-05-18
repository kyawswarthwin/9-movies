import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeriesGenresPage } from './series-genres';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [SeriesGenresPage],
  imports: [IonicPageModule.forChild(SeriesGenresPage), ComponentsModule]
})
export class SeriesGenresPageModule {}
