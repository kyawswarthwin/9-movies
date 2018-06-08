'use strict';

const Movie = require('../../app/models/Movie');

function movieListOf(request, response) {
  let query = new Parse.Query(Movie);
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
  movieListOf: movieListOf
};
