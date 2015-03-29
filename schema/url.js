var mongoose = require('../model/db.js');

module.exports = new mongoose.Schema({
	short: String,
	long: String
});
