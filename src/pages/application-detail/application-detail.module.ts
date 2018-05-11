import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationDetailPage } from './application-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ApplicationDetailPage],
  imports: [IonicPageModule.forChild(ApplicationDetailPage), ComponentsModule]
})
export class ApplicationDetailPageModule {}
