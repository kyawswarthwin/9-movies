import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationsPage } from './applications';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ApplicationsPage],
  imports: [IonicPageModule.forChild(ApplicationsPage), ComponentsModule]
})
export class ApplicationsPageModule {}
