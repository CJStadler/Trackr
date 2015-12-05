var React = require('react'),
    d3 = require('d3'),
    chart_builder = require('../chart_builder.js');


var Chart = React.createClass({displayName: "Chart",

    componentDidMount: function() {
        chart_builder.init(this.chart_id());
        chart_builder.update(this.races_for_event());
    },

    componentDidUpdate: function() {
        chart_builder.update(this.races_for_event());
    },

    render: function() {
        return React.createElement("div", {id: this.chart_id()})
    },

    races_for_event: function() {
        var races = [];
        var event = this.props.event;
        this.props.athletes.forEach(function(a){
            a.races.forEach(function(r) {
                if (r.event === event && r.mark !== "NT") {
                    r.date = parseDate(nice_date(r.date));
                    r.mark = time_to_seconds(r.mark);
                    races.push(r);
                }
            });
        });

        return races;
    },

    chart_id: function() {
        return "chart-" + this.props.event.replace(',', '');
    },
});

var parseDate = d3.time.format("%m/%d/%y").parse;

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
}

module.exports = Chart;
