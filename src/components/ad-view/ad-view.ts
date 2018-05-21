import { Component } from '@angular/core';

import Parse from 'parse';

@Component({
  selector: 'ad-view',
  templateUrl: 'ad-view.html'
})
export class AdViewComponent {
  message: string;

  constructor() {
    Parse.Config.get()
      .then(config => {
        this.message = config.get('ad');
      })
      .catch(console.error);
  }
}
