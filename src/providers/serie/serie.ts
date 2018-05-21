import { Injectable } from '@angular/core';

import Parse from 'parse';

@Injectable()
export class SerieProvider extends Parse.Object {
  constructor() {
    super('Serie');
  }

  static load(params: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Parse.Cloud.run('serieLoad', params)
        .then(resolve)
        .catch(reject);
    });
  }

  static listOf(params?: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Parse.Cloud.run('serieListOf', params)
        .then(resolve)
        .catch(reject);
    });
  }
}

Parse.Object.registerSubclass('Serie', SerieProvider);
