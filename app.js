var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	APIError = require('./model/apierror.js');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// main contents
app.use('/', require('./rout/v1.js'));

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.send(err);
});


module.exports = app;
