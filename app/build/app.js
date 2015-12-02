var React = require('react');
var ChartsDisplay = require('./components/charts_display.js');
var GetAthleteForm = require('./components/get_athlete_form.js');
var AthletesKey = require('./components/athletes_key.js');

var App = React.createClass({displayName: "App",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("section", {id: "top-bar"}, 
					React.createElement(GetAthleteForm, {add_athlete: this.add_athlete}), 
					React.createElement(AthletesKey, null)
				), 
				React.createElement(ChartsDisplay, {data: this.state})
			)
		);
	},

	add_athlete: function(athlete) {
		console.log("adding athlete: " + athlete)
	},
});

module.exports = App;
