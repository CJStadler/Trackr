var express = require('express');
var router = express.Router();
var scraper = require('../scraper.js');

router.get('/', function(req, res) {
	data = scraper.get_data_from_url(req.query.tfrrs_id, function(data) {
		res.json(data);
	});
});

module.exports = router;
