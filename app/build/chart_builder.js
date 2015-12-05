var d3 = require('d3');

var svg, x, y, xAxis, yAxis, line,
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
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.mark); });

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

var update_chart =  function(races) {
    x.domain(d3.extent(races, function(d) { return d.date; }));
    y.domain(d3.extent(races, function(d) { return d.mark; }));

    var t = svg.transition().duration(transition_duration);
    t.select(".x.axis").call(xAxis);
    t.select(".y.axis").call(yAxis);

    draw_points(races);
    draw_lines();
};

var draw_points = function(races) {

    // JOIN
    var dots = svg.selectAll(".dot")
        .data(races);

    // UPDATE
	dots.transition().duration(transition_duration)
		.attr("cx", function(d) { return x(d.date); })
		.attr("cy", function(d) { return y(d.mark); });

    // ENTER
    dots.enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", function(d) {
            return x(d.date);
        })
        .attr("cy", function(d) { return y(d.mark); })
        // .on('mouseover', tip.show)
        // .on('mouseout', tip.hide)
        // .style("fill", color)
        .style("fill-opacity", 1e-6)
        .transition().duration(transition_duration)
            .style("fill-opacity", 1);
};

var draw_lines = function() {

};

var parseDate = d3.time.format("%m/%d/%y").parse;
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


module.exports = {init: init_chart, update: update_chart};
