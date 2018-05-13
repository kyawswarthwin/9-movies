import { Injectable } from '@angular/core';

import Parse from 'parse';

@Injectable()
export class MusicProvider extends Parse.Object {
  constructor() {
    super('Music');
  }

  static load(params?: any, keys: any = ['title', 'artist', 'album']): Promise<MusicProvider[]> {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query(this);
      if (params) {
        //By
        if (params.by) {
          query.equalTo(params.by, params.name);
          keys = keys.filter(data => data !== params.by);
        }
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

Parse.Object.registerSubclass('Music', MusicProvider);
