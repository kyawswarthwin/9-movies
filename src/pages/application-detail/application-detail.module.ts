import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationDetailPage } from './application-detail';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ApplicationDetailPage],
  imports: [IonicPageModule.forChild(ApplicationDetailPage), ComponentsModule, PipesModule]
})
export class ApplicationDetailPageModule {}
