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

  static detail(params: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Parse.Cloud.run('serieDetail', params)
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

  get file(): string {
    return this.get('file');
  }

  get title(): string {
    return this.get('title');
  }

  get artist(): string {
    return this.get('artist');
  }

  get album(): string {
    return this.get('album');
  }

  get year(): string {
    return this.get('year');
  }

  get comment(): string {
    return this.get('comment');
  }

  get track(): string {
    return this.get('track');
  }

  get genre(): string {
    return this.get('genre');
  }

  get picture(): Parse.File {
    return this.get('picture');
  }
}

Parse.Object.registerSubclass('Serie', SerieProvider);
