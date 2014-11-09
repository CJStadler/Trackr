// Client-side javascripts for Trackr App
// requires jquery

// listeners
$(document).ready(function() {
	init_get_url();
});

var init_get_url = function() {
	$('#get-url').submit(function(event) {
		event.preventDefault();
		
		var form_data = $(this).serialize();
		
		$.ajax({
			url: '/api',
			type: 'GET',
			data: form_data,
			dataType: 'json',
			success: function(data) {
				viz_new_data(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("error with ajax");
			}
		});
		
		
		//var input_text = $form.find('#tfrrs-url').val();
		// cut off a leading 
		//var input_text = (input_text.slice(0,1) == '/' ? input_text.slice(1) : input_text)
		
	
	});
};

var viz_new_data = function(data) {
	// controller for adding a new visualization
	
	// Athlete or org?
	athlete_graphs(data)
	
	// testing 
	//$('#graphs').prepend("<article class='pane'></article>").text(data);
};

var athlete_graphs = function(data) {
	var panel = new_panel(data.athlete.name, data.athlete.url);
	$('#graphs').prepend(panel)
	var events = sort_by_event(data.athlete.races);
	$.each(events, function(event_name, performances) {
		panel.append("<h2>" + event_name + "</h2>");
		graph_event(performances, panel);
	}); 
	
};

// given an array of performances, make a graph and append it to the panel.
// based on http://bl.ocks.org/mbostock/3883245
var graph_event = function(data, panel) {
	var margin = {top: 20, right: 20, bottom: 20, left: 40},
	width = panel.width() - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%m/%d/%y").parse;
	var parseTime = d3.time.format("%M:%S.%L").parse;

	var x = d3.time.scale()
		.range([0, width]);

	var y = d3.time.scale()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var line = d3.svg.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.mark); });

	var svg = d3.selectAll(panel.toArray()).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	data.forEach(function(d) {
		d.date = parseDate(nice_date(d.date));
		d.mark = parseTime(d.mark);
	});

	x.domain(d3.extent(data, function(d) { return d.date; })).nice();
	y.domain(d3.extent(data, function(d) { return d.mark; })).nice();

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Time");

	svg.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", line);
		
	svg.selectAll(".dot")
		.data(data)
		.enter().append("circle")
		.attr("class", "dot")
		.attr("r", 5)
		.attr("cx", function(d) { return x(d.date); })
		.attr("cy", function(d) { return y(d.mark); })
		.append("title").text(function(d) { return performance_info(d); });
};

// takes an object describing a performance and returns a nice readable string.
var performance_info = function(performance) {
	return "Meet: " + performance.meet + "\n"
			+ "Date: " + performance.date + "\n"
			+ "Event: " + performance.event + "\n"
			+ "Time: " + performance.mark + "\n"
			+ "Place: " + performance.place + "\n";
};

var new_panel = function(title, href) {
	var panel = $("<article class='panel'></article>");
	panel.append("<div class='close-panel'>x</div>").click(function() { panel.remove(); });
	var header = $("<h1><a href='"+href+"'>"+title+"</a></h1>");
	panel.append(header);
	return panel;
};

// tfrrs dates are messy so we'll clean and standardize them
var nice_date = function(date) {
	date = date.slice(-8); // sometimes the dates are in ranges so we'll just take the last one
	date = date.replace(/-/g, "/");
	return date;
};

// takes an array of races/performances and returns an object of them sorted by event
var sort_by_event = function(races) {
	var events = {};
	var len = races.length
	for (var i=0; i<len; i++) {
		var race = races[i]
		var event_name = race.event;
		
		if (!(event_name in events)) {
			events[event_name] = [];
		}
		events[event_name].push(race);
	};
	return events;
};



