'use strict';

const Music = require('../../app/models/Music');

module.exports = {
  className: 'Music',
  beforeSave: function(req, res) {
    let query = new Parse.Query(Music);
    query.equalTo('file', req.object.get('file'));
    query.first().then(data => {
      if (!data) res.success();
    });
  }
};
