var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var scraper = {
    get_data_from_url: function(id_string, callback) {
    	var full_url = "http://www.tfrrs.org/athletes/" + id_string;

    	// strip trailing ".html" if present
    	if (id_string.slice(-5) == ".html") {
        id_string = id_string.slice(0,-5);
      }

  		var id = parseInt(id_string);

    	// scrape
    	return request.get(full_url, function(error, response, html) {
        var data = {};

    		if(!error){
    			var $ = cheerio.load(html);

  				data.athlete = this.scrape_athlete_page($);
  				data.athlete.id = id;
  				data.athlete.url = full_url;

    		} else {
    			data.error = "error getting tfrrs page.";
    		}

        callback(data);

    	}.bind(this));
    },

    scrape_athlete_page: function($) {
    	var athlete = {};
      var athlete_container = $("form[name='athlete']");

    	var title = athlete_container.find("h3.panel-title").first();
    	athlete.name = title.text().trim();

    	// athlete.bests = [];
    	athlete.races = [];

    	// Bests Logic
    	// var headings = $(".topperformances .title tr").children().toArray();
    	// $(".marked").each(function(){
    	// 	var numBefore = $(this).parent().prevAll().length;
    	// 	var eventName = headings[numBefore].children[0].children[0].data.replace(/\s+/g, '');
    	// 	athlete.bests.push({event : eventName, time : $(this).text()});
    	// });

    	// Select each meet
    	$("#meet-results table").each(function() {
        // The HTML structure looks like this (as of March 2018)
        // #meet-results
        //   table
        //     thead
        //       tr
        //         a (Meet Name)
        //         span (Date)
        //     tr
        //       td (Event)
        //       td (Mark/Time)
        //       td (Place)
        //     tr (Repeat for each race at the meet)
        //     ...

        var meet = $(this).find("thead a").text().trim();
        var date = $(this).find("thead span").text().trim();

        // Select each performance
        $(this).children("tr").each(function() {
          var columns = $(this).find("td");
          var race = {
            "date": date,
            "meet": meet,
            "event": columns.eq(0).text().trim(),
            "mark": columns.eq(1).text().trim(),
            "place": columns.eq(2).text().trim()
          };
          console.log("event = " + race.event);

          athlete.races.push(race);
        });
    	});

    	return athlete;
    }
};

module.exports = scraper;
