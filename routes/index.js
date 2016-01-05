var express = require('express');
var router = express.Router();
var App = require('../app/build/app.js');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var when = require('when');
var iso = require('iso');
var scraper = require('../scraper.js');

/* GET home page. */
router.get('/', function(req, res) {
	console.log('GET /');
	var promises = [];

	if (req.query.athlete_ids) {
		console.log("looking up athletes: " + req.query.athlete_ids);
		// get promises for each request
		promises = req.query.athlete_ids.map(function(id) {
			return when.promise(function(resolve, reject, notify) {
				scraper.get_data_from_url(id, function(data) {
					resolve(data.athlete);
				});
			});
		});

		// requests are done
		when.all(promises).then(function (athletes) {
    		console.log("Finished " + promises.length + " promises");
			render_app(athletes, res);
		});

	} else {
		// No athletes
		render_app([], res);
	}
});

var render_app = function(athletes, res) {
	var props = {athletes: athletes};
	var app_html =  ReactDOMServer.renderToString(React.createElement(App, props));
	//iso.add(app_html, props, {id: 'app'});
	res.render('index', {app: iso.render(app_html, props, {id: 'app'})});
};

module.exports = router;
