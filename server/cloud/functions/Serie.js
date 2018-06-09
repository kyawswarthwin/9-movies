'use strict';

const Serie = require('../../app/models/Serie');

function serieLoad(request, response) {
  let query = new Parse.Query(Serie);
  let pipeline = [{}];
  let direction = 1;
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
  pipeline[pipeline.length - 1]['group'] = {
    objectId: `$${request.params.field}`,
    year: { $min: '$year' },
    updatedAt: { $max: '$_updated_at' },
    count: { $sum: 1 }
  };
  if (request.params.field === 'album') {
    pipeline[pipeline.length - 1]['group']['picture'] = { $first: '$picture' };
  }
  // Sort
  if (request.params.sortBy) {
    let sortBy = request.params.sortBy;
    if (sortBy.charAt(0) === '-') {
      sortBy = sortBy.substr(1);
      direction = -1;
    }
    pipeline[pipeline.length - 1]['sort'] =
      sortBy === 'album'
        ? {
            _id: direction
          }
        : {
            [`${sortBy}`]: direction
          };
  }
  query
    .aggregate(pipeline)
    .then(response.success)
    .catch(response.error);
}

function serieDetail(request, response) {
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
  // Search
  if (request.params.search) {
    pipeline[0]['match'] = {
      [`${request.params.field}`]: { $regex: request.params.search }
    };
  }
  pipeline[0]['group'] = {
    objectId: `$${request.params.field}`,
    count: { $sum: 1 }
  };
  if (request.params.field === 'album') {
    pipeline[0]['group']['picture'] = { $first: '$picture' };
  }
  // Sort
  if (request.params.sort) {
    pipeline[0]['sort'] = {
      _id: Number(request.params.sort)
    };
  }
  query
    .aggregate(pipeline)
    .then(response.success)
    .catch(response.error);
}

module.exports = {
  serieLoad: serieLoad,
  serieDetail: serieDetail,
  serieListOf: serieListOf
};
