import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeriesGenresPage } from './series-genres';

@NgModule({
  declarations: [
    SeriesGenresPage,
  ],
  imports: [
    IonicPageModule.forChild(SeriesGenresPage),
  ],
})
export class SeriesGenresPageModule {}
