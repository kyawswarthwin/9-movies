import { Component, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage } from 'ionic-angular';

import 'rxjs/add/operator/first';

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
  review: string = '';

  constructor(public injector: Injector, public http: HttpClient) {
    super(injector);

    this.application = new Application();
    this.application.id = this.navParams.data.id;
  }

  async ionViewDidLoad() {
    try {
      this.showLoadingView('Loading...');
      await this.application.fetch();
      await this.http
        .get(this.getDownloadUrl('applications', `${this.application.file.split('.')[0]}.html`), {
          responseType: 'text'
        })
        .first()
        .toPromise()
        .then(data => (this.review = data))
        .catch(console.error);
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
