import { Injectable } from '@angular/core';

import Parse from 'parse';

@Injectable()
export class ApplicationProvider extends Parse.Object {
  constructor() {
    super('Application');
  }

  static load(params?: any, fields: any = ['name', 'packageName']): Promise<ApplicationProvider[]> {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query(this);
      if (params) {
        // Search
        if (params.search) {
          let queries = [];
          fields.forEach((field, index) => {
            queries[index] = new Parse.Query(this);
            queries[index].contains(field, params.search);
          });
          query = Parse.Query.and(query, Parse.Query.or(...queries));
        }
        // Sort
        if (params.sortBy) {
          let sortBy = params.sortBy;
          if (sortBy.charAt(0) === '-') {
            sortBy = sortBy.substr(1);
            query.descending(sortBy);
          } else {
            query.ascending(sortBy);
          }
        }
        // Paginate
        if (params.page >= 0) {
          let limit = params.limit || 15;
          query.limit(limit);
          query.skip(params.page * limit);
        }
      }
      query
        .find()
        .then(resolve)
        .catch(reject);
    });
  }

  get file(): string {
    return this.get('file');
  }

  get name(): string {
    return this.get('name');
  }

  get icon(): Parse.File {
    return this.get('icon');
  }

  get packageName(): string {
    return this.get('packageName');
  }

  get versionCode(): number {
    return this.get('versionCode');
  }

  get versionName(): string {
    return this.get('versionName');
  }

  get requiredSdk(): number {
    return this.get('requiredSdk');
  }
}

Parse.Object.registerSubclass('Application', ApplicationProvider);
