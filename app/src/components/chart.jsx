var React = require('react'),
    d3 = require('d3'),
    chart_builder = require('../chart_builder.js');

var Chart = React.createClass({

    getInitialState: function() {
        return {chart_builder: chart_builder()};
    },

    componentDidMount: function() {
        this.state.chart_builder.init(this.chart_id());
        this.state.chart_builder.update(this.props.event);
    },

    componentDidUpdate: function() {
        this.state.chart_builder.update(this.props.event);
    },

    render: function() {
        return <div id={this.chart_id()}></div>
    },

    chart_id: function() {
        return "chart-" + this.props.event.name.replace(',', '');
    },
});

module.exports = Chart;
