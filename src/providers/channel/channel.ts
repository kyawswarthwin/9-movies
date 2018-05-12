import { Injectable } from '@angular/core';

import Parse from 'parse';

@Injectable()
export class ChannelProvider extends Parse.Object {
  constructor() {
    super('Channel');
  }

  static load(params?: any, keys: any = ['name']): Promise<ChannelProvider[]> {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query(this);
      if (params) {
        //Search
        if (params.search) {
          let queries = [];
          keys.forEach((key, index) => {
            queries[index] = new Parse.Query(this);
            queries[index].contains(key, params.search);
          });
          query = Parse.Query.or(...queries);
        }
        //Sort
        if (params.sortBy) {
          let sortBy = params.sortBy;
          if (sortBy.charAt(0) === '-') {
            sortBy = sortBy.substr(1);
            query.descending(sortBy);
          } else {
            query.ascending(sortBy);
          }
        }
        //Paginate
        if (params.page >= 0) {
          let limit = params.limit || 15;
          query.limit(limit);
          query.skip(params.page * limit);
        }
      }
      query.find().then(resolve, reject);
    });
  }

  get name(): string {
    return this.get('name');
  }

  get url(): string {
    return this.get('url');
  }
}

Parse.Object.registerSubclass('Channel', ChannelProvider);
