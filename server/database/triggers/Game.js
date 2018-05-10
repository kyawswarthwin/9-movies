'use strict';

const Game = require('../../app/models/Game');

module.exports = {
  className: 'Game',
  beforeSave: function(req, res) {
    const queries = [];
    queries[0] = new Parse.Query(Game);
    queries[0].equalTo('packageName', req.object.get('packageName'));
    queries[1] = new Parse.Query(Game);
    queries[1].equalTo('versionCode', req.object.get('versionCode'));
    const query = Parse.Query.or(...queries);
    query.first().then(data => {
      if (!data) res.success();
    });
  }
};
