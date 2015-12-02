var React = require('react');
var ChartsDisplay = require('./components/charts_display.js');
var GetAthleteForm = require('./components/get_athlete_form.js');
var AthletesKey = require('./components/athletes_key.js');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<section id='top-bar'>
					<GetAthleteForm add_athlete={this.add_athlete} />
					<AthletesKey />
				</section>
				<ChartsDisplay data={this.state} />
			</div>
		);
	},

	add_athlete: function(athlete) {
		console.log("adding athlete: " + athlete)
	},
});

module.exports = App;
