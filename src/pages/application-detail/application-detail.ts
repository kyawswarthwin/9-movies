import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../base/base';
import { ApplicationProvider as Application } from '../../providers/application/application';

@IonicPage({
  name: 'ApplicationDetailPage',
  segment: 'applications/:id',
  defaultHistory: ['ApplicationsPage']
})
@Component({
  selector: 'page-application-detail',
  templateUrl: 'application-detail.html'
})
export class ApplicationDetailPage extends BasePage {
  application: Application;

  constructor(public injector: Injector) {
    super(injector);

    this.application = new Application();
    this.application.id = this.navParams.data.id;
  }

  async ionViewDidLoad() {
    try {
      this.showLoadingView('Loading...');
      await this.application.fetch();
      this.showContentView();
    } catch (error) {
      if (error.code === 101) {
        this.showEmptyView();
      } else {
        this.showErrorView();
      }
    }
  }
}
