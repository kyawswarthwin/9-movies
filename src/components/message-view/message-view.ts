import { Component, Input } from '@angular/core';

@Component({
  selector: 'message-view',
  templateUrl: 'message-view.html'
})
export class MessageViewComponent {
  @Input() icon: string = 'alert';
  @Input() message: string = '';

  constructor() {}
}
