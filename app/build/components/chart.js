var React = require('react'),
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
                    races.push(r);
                }
            });
        });

        return races;
    },

    chart_id: function() {
        return "chart-" + this.props.event
    },
});

module.exports = Chart;
