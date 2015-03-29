var express = require('express'),
	router = express.Router(),
	Url = {
		model: require('../model/url.js')
	};

router.use(function(req, res, next) {
	res.set({
		'Content-Type': 'application/json',
	});
	next();
});
router.post('/shortenurl', function(req, res, next){
	new Url({
		long: req.body.LongUrl
	}).save(function(err, savedUrl){
		var shortUrl = 'http://52.68.27.66/' + savedUrl._id.toString();
		Url.model.findByIdAndUpdate(savedUrl._id, {
			short: 'http://52.68.27.66/' + savedUrl._id.toString()
		}, function(err, updatedUrl) {
			req.json({
				"ShortUrl": shortUrl
			});
		});
	});
});

module.exports = router;
