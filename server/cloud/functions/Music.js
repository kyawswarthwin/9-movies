'use strict';

const Music = require('../../app/models/Music');

function musicListOf(request, response) {
  let query = new Parse.Query(Music);
  let pipeline = [{}];
  let direction = -1;
  // Search
  if (request.params.search) {
    pipeline[0]['match'] = {
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
    pipeline[0]['sort'] = {
      [`${sortBy}`]: direction
    };
  }
  pipeline[0]['group'] = {
    objectId: `$${request.params.field}`,
    count: { $sum: 1 }
  };
  if (request.params.field === 'album') {
    pipeline[0]['group']['picture'] = { $first: '$picture' };
  }
  query
    .aggregate(pipeline)
    .then(response.success)
    .catch(response.error);
}

module.exports = {
  musicListOf: musicListOf
};
