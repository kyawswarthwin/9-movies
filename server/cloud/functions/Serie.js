'use strict';

const Serie = require('../../app/models/Serie');

function serieLoad(request, response) {
  let query = new Parse.Query(Serie);
  query
    .aggregate([
      {
        match: {
          album: request.params.title
        },
        sort: {
          comment: -1,
          track: 1
        },
        group: {
          objectId: `$comment`,
          count: { $sum: 1 },
          episodes: {
            $push: {
              id: '$_id',
              file: '$file',
              title: '$title',
              track: '$track'
            }
          }
        }
      }
    ])
    .then(response.success)
    .catch(response.error);
}

function serieListOf(request, response) {
  let query = new Parse.Query(Serie);
  let pipeline = [{}];
  let direction = -1;
  // Series By
  if (request.params.by) {
    pipeline[0]['match'] = {
      [`${request.params.by}`]: { $regex: request.params.value }
    };
  }
  // Search
  if (request.params.search) {
    pipeline[pipeline.length - 1]['match'] = {
      [`${request.params.field}`]: { $regex: request.params.search }
    };
  }
  // Sort
  if (request.params.sortBy) {
    let sortBy = request.params.sortBy;
    if (sortBy.charAt(0) === '-') {
      sortBy = sortBy.substr(1);
      direction = 1;
    }
    pipeline[pipeline.length - 1]['sort'] = {
      [`${sortBy}`]: direction
    };
  }
  // Paginate
  if (request.params.page >= 0) {
    let limit = request.params.limit || 15;
    pipeline[pipeline.length - 1]['limit'] = limit;
    pipeline[pipeline.length - 1]['skip'] = request.params.page * limit;
  }
  pipeline[pipeline.length - 1]['group'] = {
    objectId: `$${request.params.field}`,
    year: { $first: '$year' },
    count: { $sum: 1 }
  };
  if (request.params.field === 'album') {
    pipeline[pipeline.length - 1]['group']['picture'] = { $first: '$picture' };
  }
  query
    .aggregate(pipeline)
    .then(response.success)
    .catch(response.error);
}

module.exports = {
  serieLoad: serieLoad,
  serieListOf: serieListOf
};
