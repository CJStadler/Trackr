var React = require('react');
var ChartsDisplay = require('./components/charts_display.js');
var Controller = require('./components/controller.js');
var d3 = require('d3');

var App = React.createClass({displayName: "App",

	getInitialState: function() {
		var state = {
			athletes: [],
			line_type: "all connected"
		};

		if (this.props.athletes) {
			// set attributes on athletes
			state.athletes = this.add_default_attributes_to_athletes(this.props.athletes);
		}

		return state;
  },

	render: function() {
		var events = this.get_events_from_athletes(this.state.athletes);
		var display;
		if (events.length > 0) {
			display = React.createElement(ChartsDisplay, {athletes: this.state.athletes, events: events, line_type: this.state.line_type})
		} else {
			display = this.welcome_tip;
		}
		return (
			React.createElement("div", null, 
				React.createElement(Controller, {
					athletes: this.state.athletes, 
					line_type: this.state.line_type, 
					add_athlete: this.add_athlete, 
					set_athlete_state: this.set_athlete_state, 
					set_line_type: this.set_line_type}), 
				display
			)
		);
	},

	set_line_type: function(type) {
		this.setState({line_type: type});
	},

	get_color: d3.scale.category10(),

	add_athlete: function(athlete) {
		var athletes = this.state.athletes.slice();
		athlete.active = true;
		athlete.color = this.get_color(athletes.length);
		athletes.push(athlete);
    add_athlete_id_to_url(athlete.id);
		this.setState({athletes: athletes});
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
			if (athlete.active) {
        athlete.races.forEach(function(race) {
					if (race.mark != "NT") {
						race.color = athlete.color;
						race.key = Date.now() + race.mark;
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
			}

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
		athlete.active = active
		this.setState({athletes: athletes});
	},

	welcome_tip: (
		React.createElement("div", {id: "welcome-tip", className: "panel"}, 
			React.createElement("p", null, "To chart an athlete's performances: find their TFRRS page, copy their ID from the url, and enter it above."), 
			React.createElement("p", null, "E.g. my TFRRS page is ", React.createElement("a", {href: "https://www.tfrrs.org/athletes/3273206"}, "tffrs.org/athletes/3273206.html"), ", so my ID is 3273206."), 
      React.createElement("p", null, "Add multiple athletes to compare them.")
		)
	)
});

function add_athlete_id_to_url(id) {
  var query_string = window.location.search;

  if (!query_string) {
    query_string = "?";
  } else {
    query_string += "&";
  }

  query_string += "athlete_ids[]=" + id;

  window.history.pushState({}, '', query_string)
}

module.exports = App;
