import { Injectable } from '@angular/core';

import Parse from 'parse';

@Injectable()
export class MovieProvider extends Parse.Object {
  constructor() {
    super('Movie');
  }

  static load(params?: any, fields: any = ['title', 'artist', 'file']): Promise<MovieProvider[]> {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query(this);
      if (params) {
        // Movies By
        if (params.by) {
          query.equalTo(params.by, params.value);
          fields = fields.filter(data => data !== params.by);
        }
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

  static listOf(params?: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Parse.Cloud.run('movieListOf', params)
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

  get year(): string {
    return this.get('year');
  }

  get comment(): string {
    return this.get('comment');
  }

  get genre(): string {
    return this.get('genre');
  }

  get picture(): Parse.File {
    return this.get('picture');
  }
}

Parse.Object.registerSubclass('Movie', MovieProvider);
