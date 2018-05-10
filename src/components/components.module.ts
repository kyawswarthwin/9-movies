import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MessageViewComponent } from './message-view/message-view';

@NgModule({
  declarations: [MessageViewComponent],
  imports: [IonicModule],
  exports: [MessageViewComponent]
})
export class ComponentsModule {}
