import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeriesSeriesPage } from './series-series';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [SeriesSeriesPage],
  imports: [IonicPageModule.forChild(SeriesSeriesPage), ComponentsModule]
})
export class SeriesSeriesPageModule {}
