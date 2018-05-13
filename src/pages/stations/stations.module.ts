import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationsPage } from './stations';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [StationsPage],
  imports: [IonicPageModule.forChild(StationsPage), ComponentsModule]
})
export class StationsPageModule {}
