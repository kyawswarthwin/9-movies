import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SerieDetailPage } from './serie-detail';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [SerieDetailPage],
  imports: [IonicPageModule.forChild(SerieDetailPage), ComponentsModule]
})
export class SerieDetailPageModule {}
