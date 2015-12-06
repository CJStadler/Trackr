var d3 = require('d3'),
    d3_tip = require('d3-tip');

d3_tip(d3);

var chart_builder = function() {

    var svg, x, y, xAxis, yAxis, line, tip,
        height = 300,
        width = 500,
        margin = {top: 20, right: 20, bottom: 20, left: 35},
        inner_height = 300 - margin.top - margin.bottom,
        inner_width = 500 - margin.right - margin.left,
        transition_duration = 750;

    var init_chart = function(chart_id) {
        // Add svg
        svg = d3.select("#" + chart_id)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // init variables
        x = d3.time.scale()
            .range([0, inner_width]);

        y = d3.scale.linear()
            .range([inner_height, 0]);

        xAxis = d3.svg.axis()
            .scale(x)
            .ticks(7)
            //.tickFormat(function(d) { return showMonth(d); })
            .orient("bottom");

        yAxis = d3.svg.axis()
            .scale(y)
            .tickFormat(function(d) { return short_time(d); })
            .orient("left");

        line = d3.svg.line()
                .x(function(d) { return x(parseDate(d.date)); })
                .y(function(d) { return y(time_to_seconds(d.mark)); });

        tip = d3.tip()
    		.attr('class', 'd3-tip')
    		.offset(function(d) {
    			var circle_offset = this.getBoundingClientRect().left;
    			if (circle_offset < 150) {
    				return [0, 8];
    			} else {
    				return [-8, 0];
    			}
    		})
    		.direction(function(d) {
    			var circle_offset = this.getBoundingClientRect().left;
    			if (circle_offset < 150) {
    				return 'e';
    			} else {
    				return 'n';
    			}
    		})
    		.html(function(d) {
    			return tooltip_html(d);
    		});

        svg.call(tip);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + inner_height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6);
    };

    var update_chart =  function(event) {
        x.domain(d3.extent(event.races, function(d) { return parseDate(d.date); }));
        y.domain(d3.extent(event.races, function(d) { return time_to_seconds(d.mark); }));

        var t = svg.transition().duration(transition_duration);
        t.select(".x.axis").call(xAxis);
        t.select(".y.axis").call(yAxis);

        draw_points(event.races);
        draw_lines(event.athletes);
    };

    var draw_points = function(races) {

        // JOIN
        var dots = svg.selectAll(".dot")
            .data(races, function(d) { return d.key; });

        // UPDATE
    	dots.transition().duration(transition_duration)
    		.attr("cx", function(d) { return x(parseDate(d.date)); })
    		.attr("cy", function(d) { return y(time_to_seconds(d.mark)); });

        // ENTER
        dots.enter().append("circle")
            .attr("class", "dot")
            .attr("r", 5)
            .attr("cx", function(d) {
                return x(parseDate(d.date));
            })
            .attr("cy", function(d) {
                return y(time_to_seconds(d.mark));
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .style("fill", function(d) { return d.color; })
            .style("fill-opacity", 1e-6)
            .transition().duration(transition_duration)
                .style("fill-opacity", 1);
    };

    var draw_lines = function(races_by_athlete_name) {

    };

    var parseDate = function(d) {
        return d3.time.format("%m/%d/%y").parse(nice_date(d));
    };

    // tfrrs dates are messy so we'll clean and standardize them
    var nice_date = function(date) {
    	date = date.slice(-8); // sometimes the dates are in ranges so we'll just take the last one
    	date = date.replace(/-/g, "/");
    	return date;
    };

    // takes a string representing a time and returns the number of seconds.
    var time_to_seconds = function(time) {
    	var seconds = 0.0;
    	var arr = time.split(":").reverse();
    	var len = arr.length;
    	seconds += parseFloat(arr[0]); // seconds
    	if (len > 1) {
    		seconds += parseInt(arr[1])*60; // minutes
    	}
    	return seconds;
    };

    //var showMonth: d3.time.format("%m/%y");
    //var parseTime: d3.time.format("%M:%S.%L").parse;

    var short_time = function(total) {
        return seconds_to_time(total).slice(0,-3);
    };

    // take the number of seconds and format it for display
    var seconds_to_time = function(total) {
        var minutes = Math.floor(total/60);
        var seconds = total - minutes*60;
        var divider;
        if (seconds < 10) {
            divider = ":0";
        } else {
            divider = ":";
        }
        return minutes + divider + seconds.toFixed(2);
    };

    // takes an object describing a performance and returns a nice readable string.
    var tooltip_html = function(performance) {
    	// var nice_date = d3.time.format("%m/%d/%y");
    	return "<p>Meet: <span>" + performance.meet + "</span></p>" +
    			"<p>Date: <span>" + parseDate(performance.date) + "</span></p>" +
    			"<p>Event: <span>" + performance.event + "</span></p>" +
    			"<p>Time: <span>" + performance.mark + "</span></p>" +
    			"<p>Place: <span>" + performance.place + "</span></p>";
    };

    return {init: init_chart, update: update_chart};
};

module.exports = chart_builder;
