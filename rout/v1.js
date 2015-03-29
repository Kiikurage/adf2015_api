var express = require('express'),
	router = express.Router(),
	Url = {
		model: require('../model/url.js')
	};

router.post('/api/v1/shortenurl', function(req, res, next) {
	var longUrl = req.body.LongUrl;

	console.log(longUrl);

	new Url.model({
			long: longUrl
		})
		.save(function(err, savedUrl) {
			var shortUrl = 'http://52.68.27.66/url/' + savedUrl._id.toString();
			res.set({
				'Content-Type': 'application/json',
			});
			res.json({
				"ShortUrl": shortUrl
			});
		});
});

router.use('/url/:urlId', function(req, res, next) {
	Url.model.findOne({
		_id: req.params.urlId
	}, function(err, url) {
		res.status(308).set({
			'Content-Type': 'text/html; charset=UTF-8',
		});
		res.send('<HTML>' +
			'<HEAD>' +
			'<TITLE>Moved Permanently</TITLE>' +
			'</HEAD>' +
			'<BODY>' +
			'<H1>Moved Permanently</H1>' +
			'The document has moved <A HREF="' + url.long + '">here</A>.' +
			'</BODY>' +
			'</HTML>');
	});
});

module.exports = router;
