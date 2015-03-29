var mongoose = require('./db.js'),
	schema = require('../schema/url.js');

var model = mongoose.model('Url', schema);

model.toObject = function(user, callback) {
	return callback(null, {
		id: user._id.toString(),
		created: user.created,
		updated: user.updated,
		userId: user.userId,
		name: user.name
	});
};

module.exports = model;
