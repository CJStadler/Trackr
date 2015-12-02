var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var App = require('../app/build/app.js');
var React = require('react');

/* GET home page. */
router.get('/', function(req, res) {
	var data = req;
	var html =  React.renderToString(React.createElement(App, {}));
	res.render('index', {app: html});
	console.log('GET /');
});

// Shouldn't this be in a seperate route?
// router.get('/api', function(req, res) {
// 	var url = req.query.tfrrs_url;
// 	get_data_from_url(url, res);
// });
//
// var get_data_from_url = function(url, res) {
//
// 	var full_url = "http://www.tfrrs.org/athletes/" + url;
//
// 	var type, id;
// 	// strip trailing ".html"
// 	if (url.slice(-5) == ".html") { url = url.slice(0,-5); }
//
// 	// get type and id
// 	//if (url.slice(0,8) == "athletes") {
// 		type = "athlete";
// 		id = parseInt(url);
// 	/*} else if (url.slice(0,5) == "teams") {
// 		type = "team";
// 		id = parseInt(url.slice(6));
// 	} else {
// 		res.json({error: "not a valid url. 'athletes/:id' or 'teams/:id'."});
// 		return;
// 	};
// 	*/
//
// 	// scrape
// 	var data = {}
// 	request.get(full_url, function(error, response, html){
// 		data = {};
// 		if(!error){
// 			var $ = cheerio.load(html);
//
// 			if (type == "athlete") {
// 				data.athlete = scrape_athlete_page($);
// 				data.athlete.id = id;
// 				data.athlete.url = full_url;
// 			} else {
// 				data.team = scrape_team_page($);
// 			};
//
// 		} else {
// 			data.error = "error getting tfrrs page.";
// 		};
//
// 		res.json(data);
// 	});
//
// };
//
// var scrape_athlete_page = function($) {
// 	// based on https://github.com/freedomflyer/tfrrs-explorer
//
// 	var athlete = {};
//
// 	$("#athlete .title h2").each(function() {
// 		athlete.name = $(this).text().trim();
// 	});
//
// 	athlete.bests = [];
// 	athlete.races = [];
//
// 	// Bests Logic
// 	var headings = $(".topperformances .title tr").children().toArray();
// 	$(".marked").each(function(){
// 		var numBefore = $(this).parent().prevAll().length;
// 		var eventName = headings[numBefore].children[0].children[0].data.replace(/\s+/g, '');
// 		athlete.bests.push({event : eventName, time : $(this).text()});
// 	});
//
// 	//Loop through data for each table entry for the athlete.
// 	$('#results_data tr').each(function() {
//
// 		athlete.races.push({
// 			"date"  : $(this).find(".date").text().trim(),
// 			"meet"  : $(this).find(".meet").text().trim(),
// 			"event" : $(this).find(".event").text().trim(),
// 			"mark"  : $(this).find(".mark").text().trim(),
// 			"place" : $(this).find(".place").text().trim()
// 		});
// 	});
//
// 	return athlete;
// }

module.exports = router;
