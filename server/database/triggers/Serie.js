'use strict';

const Serie = require('../../app/models/Serie');

module.exports = {
  className: 'Serie',
  beforeSave: function(req, res) {
    const query = new Parse.Query(Serie);
    query.equalTo('file', req.object.get('file'));
    query.first().then(data => {
      if (!data) res.success();
    });
  }
};
