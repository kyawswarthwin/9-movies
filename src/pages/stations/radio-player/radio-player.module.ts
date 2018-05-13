import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RadioPlayerPage } from './radio-player';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [RadioPlayerPage],
  imports: [IonicPageModule.forChild(RadioPlayerPage), ComponentsModule]
})
export class RadioPlayerPageModule {}
