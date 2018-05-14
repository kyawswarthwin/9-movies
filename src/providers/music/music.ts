import { Injectable } from '@angular/core';

import Parse from 'parse';

@Injectable()
export class MusicProvider extends Parse.Object {
  constructor() {
    super('Music');
  }

  static load(params?: any, fields: any = ['title', 'artist', 'album']): Promise<MusicProvider[]> {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query(this);
      if (params) {
        // Songs By
        if (params.field) {
          query.equalTo(params.field, params.value);
          fields = fields.filter(data => data !== params.field);
        }
        // Search
        if (params.search) {
          let queries = [];
          fields.forEach((field, index) => {
            queries[index] = new Parse.Query(this);
            queries[index].contains(field, params.search);
          });
          query = Parse.Query.or(...queries);
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

  static listOf(params?: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Parse.Cloud.run('musicListOf', params)
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

Parse.Object.registerSubclass('Music', MusicProvider);
