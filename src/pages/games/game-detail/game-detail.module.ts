import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameDetailPage } from './game-detail';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [GameDetailPage],
  imports: [IonicPageModule.forChild(GameDetailPage), ComponentsModule, PipesModule]
})
export class GameDetailPageModule {}
