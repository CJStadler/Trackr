var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var scraper = {
    get_data_from_url: function(id_string, callback) {
        console.log(id_string);
    	var full_url = "http://www.tfrrs.org/athletes/" + id_string;

    	var type, id;
    	// strip trailing ".html"
    	if (id_string.slice(-5) == ".html") { id_string = id_string.slice(0,-5); }

		type = "athlete";
		id = parseInt(id_string);
        console.log("parsed id: " + id);

    	// scrape
    	return request.get(full_url, function(error, response, html) {
            var data = {};
    		if(!error){
    			var $ = cheerio.load(html);

    			if (type == "athlete") {
    				data.athlete = this.scrape_athlete_page($);
    				data.athlete.id = id;
    				data.athlete.url = full_url;
    			}

    		} else {
    			data.error = "error getting tfrrs page.";
    		}

            callback(data);

    	}.bind(this));
    },

    scrape_athlete_page: function($) {
    	// based on https://github.com/freedomflyer/tfrrs-explorer

    	var athlete = {};

    	$("#athlete .title h2").each(function() {
    		athlete.name = $(this).text().trim();
    	});

    	athlete.bests = [];
    	athlete.races = [];

    	// Bests Logic
    	var headings = $(".topperformances .title tr").children().toArray();
    	$(".marked").each(function(){
    		var numBefore = $(this).parent().prevAll().length;
    		var eventName = headings[numBefore].children[0].children[0].data.replace(/\s+/g, '');
    		athlete.bests.push({event : eventName, time : $(this).text()});
    	});

    	//Loop through data for each table entry for the athlete.
    	$('#results_data tr').each(function() {

    		athlete.races.push({
    			"date"  : $(this).find(".date").text().trim(),
    			"meet"  : $(this).find(".meet").text().trim(),
    			"event" : $(this).find(".event").text().trim(),
    			"mark"  : $(this).find(".mark").text().trim(),
    			"place" : $(this).find(".place").text().trim()
    		});
    	});

    	return athlete;
    }
};

module.exports = scraper;
