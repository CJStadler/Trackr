var React = require('react'),
    Chart = require('./chart.js');

var ChartsDisplay = React.createClass({displayName: "ChartsDisplay",

    getInitialState: function() {
        return {excluded_events: []};
    },

    render: function() {
        var charts = this.props.events.map(function(event) {
            return (
                React.createElement("div", {className: "panel", id: "panel-" + event.name.replace(',', ''), key: event.name}, 
                    React.createElement("div", {className: "close-panel"}, "x"), 
                    React.createElement("h1", null, event.name), 
                    React.createElement(Chart, {event: event, athletes: this.props.athletes})
                )
            );
        }.bind(this));
        return React.createElement("div", {id: "charts-display"}, charts);
    }

    // Get the names of all the events for which we have races
    // event_names: function() {
    //     var events = [];
    //     // TODO: more efficient search?
    //     this.props.athletes.forEach(function(a) {
    //         a.races.forEach(function(r) {
    //             if (events.indexOf(r.event) === -1) {
    //                 events.push(r.event);
    //             }
    //         });
    //     });
    //
    //     return events;
    // },


});

module.exports = ChartsDisplay;
