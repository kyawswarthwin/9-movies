'use strict';

const Movie = require('../../app/models/Movie');

module.exports = {
  className: 'Movie',
  beforeSave: function(req, res) {
    let query = new Parse.Query(Movie);
    query.equalTo('file', req.object.get('file'));
    query.first().then(data => {
      if (!data) res.success();
    });
  }
};
