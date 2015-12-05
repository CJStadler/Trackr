var React = require('react');
var ChartsDisplay = require('./components/charts_display.js');
var Controller = require('./components/controller.js');
var d3 = require('d3');

var App = React.createClass({

	getInitialState: function() {

		var state = {
			athletes: [],
			events: []
		};

		if (this.props.athletes) {
			// set attributes on athletes
			state.athletes = this.add_default_attributes_to_athletes(this.props.athletes);

			// get events
			state.events = this.get_events_from_athletes(this.props.athletes);
		}

		return state;
    },

	componentWillReceiveProps: function(new_props) {
		console.log("props: " + new_props);
		this.setState(new_props);
	},

	render: function() {
		return (
			<div>
				<Controller
					athletes={this.state.athletes}
					add_athlete={this.add_athlete}
					set_athlete_state={this.set_athlete_state}/>
				<ChartsDisplay athletes={this.state.athletes} events={this.state.events} />
			</div>
		);
	},

	get_color: d3.scale.category10(),

	add_athlete: function(athlete) {
		var athletes = this.state.athletes.slice();
		athlete.active = true;
		athlete.color = this.get_color(athletes.length);
		athletes.push(athlete);
		// re create events
		var events = this.get_events_from_athletes(athletes);
		this.setState({athletes: athletes, events: events});
	},

	add_default_attributes_to_athletes: function(athletes) {
		return this.props.athletes.map(function(athlete, i) {
			athlete.active = true;
			athlete.color = this.get_color(i);
			return athlete;
		}.bind(this));
	},

	// get an array of events
	// e.g. [
	//     {name: '5000',
	// 		   athletes: {name: []}
	// 	   },
	// 	   {}
	// ]
	get_events_from_athletes: function(athletes) {
		var event;
        var array = [];
        var object = athletes.reduce(function(events, athlete) {
            // e.g. {'5000': {name: '5000', athletes:{'Mike Trout': []}}}
			var athlete_races = []
            athlete.races.forEach(function(race) {
				if (race.mark != "NT") {
					race.color = athlete.color;
					race.key = Date.now() + race.mark;
	                var event;
	                if (! (race.event in events)) {
	                    events[race.event] = {name: race.event, races: [], athletes: {}};
	                }
	                if (! (athlete.name in events[race.event].athletes)) {
	                    events[race.event].athletes[athlete.name] = [];
	                }
	                events[race.event].athletes[athlete.name].push(race);
					events[race.event].races.push(race);
				}
            });
            return events;
        }, {});
		// turn the object into an array
        for (event in object) {
            array.push(object[event]);
        }
        return array;
	},

	find_athlete_index: function(id) {
		return this.state.athletes.findIndex(function(athlete) {
			return athlete.id === id;
		})
	},

	set_athlete_state: function(id, active) {
		var athletes = this.state.athletes.slice();
		var index = this.find_athlete_index(id);
		var athlete = this.state.athletes[index];
		athlete.active = active;
		this.setState({athletes: athletes});
	}
});

module.exports = App;
