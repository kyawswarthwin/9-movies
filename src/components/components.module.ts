import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MessageViewComponent } from './message-view/message-view';
import { AdViewComponent } from './ad-view/ad-view';

@NgModule({
  declarations: [MessageViewComponent, AdViewComponent],
  imports: [IonicModule],
  exports: [MessageViewComponent, AdViewComponent]
})
export class ComponentsModule {}
