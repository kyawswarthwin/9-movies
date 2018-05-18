import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeriesYearsPage } from './series-years';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [SeriesYearsPage],
  imports: [IonicPageModule.forChild(SeriesYearsPage), ComponentsModule]
})
export class SeriesYearsPageModule {}
