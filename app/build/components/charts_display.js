var React = require('react'),
    Chart = require('./chart.js');

var ChartsDisplay = React.createClass({displayName: "ChartsDisplay",

    getInitialState: function() {
        return {excluded_events: []};
    },

    render: function() {
        var charts = this.event_names().map(function(event) {
            return (
                React.createElement("div", {className: "panel", id: "panel-" + event, key: event}, 
                    React.createElement("div", {className: "close-panel"}, "x"), 
                    React.createElement("h1", null, event), 
                    React.createElement(Chart, {event: event, athletes: this.props.athletes})
                )
            );
        }.bind(this));
        return React.createElement("div", {id: "charts-display"}, charts);
    },

    // Get the names of all the events for which we have races
    event_names: function() {
        var events = [];
        // TODO: more efficient search?
        this.props.athletes.forEach(function(a) {
            a.races.forEach(function(r) {
                if (events.indexOf(r.event) === -1) {
                    events.push(r.event);
                }
            });
        });

        return events;
    },

    // Actually I don't think we need this
    races_by_event: function() {
        var array = [];
        var object = this.props.athletes.reduce(function(events, athlete) {
            // e.g. {'5000': {'Mike Trout': [race1, race2]}}
            athlete.races.forEach(function(race) {
                var event;
                if (! (race.event in events)) {
                    events[race.event] = {};
                }
                if (! (athlete.name in events[race.event])) {
                    events[race.event][athlete.name] = []
                }
                events[race.event][athlete.name].push(race)
                // if (race.event in events) {
                //     events[race.event][athlete.name].push(race);
                // } else {
                //     events[race.event][athlete.name] = [race];
                // }
            });
            return events;
        }, {});
        for (event in object) {
            array.push({name: event, athletes: object[event]});
        }
        return array;
    }
});

module.exports = ChartsDisplay;
