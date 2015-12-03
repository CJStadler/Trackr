var React = require('react');
var ChartsDisplay = require('./components/charts_display.js');
var Controller = require('./components/controller.js');
var d3 = require('d3');

var App = React.createClass({displayName: "App",

	getInitialState: function() {
		var athletes = [];
		if (this.props.athletes) {
			athletes = this.props.athletes.map(function(athlete, i) {
				athlete.active = true;
				athlete.color = this.get_color(i);
				return athlete;
			}.bind(this));

		}
		return {
			athletes: athletes
		};
    },

	componentWillReceiveProps: function(new_props) {
		console.log("props: " + new_props);
		this.setState(new_props);
	},

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(Controller, {
					athletes: this.state.athletes, 
					add_athlete: this.add_athlete, 
					set_athlete_state: this.set_athlete_state}), 
				React.createElement(ChartsDisplay, {athletes: this.state.athletes})
			)
		);
	},

	get_color: d3.scale.category10(),

	add_athlete: function(athlete) {
		var athletes = this.state.athletes.slice();
		athlete.active = true;
		athlete.color = this.get_color(athletes.length);
		athletes.push(athlete);
		this.setState({athletes: athletes});
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
	},

	next_color: function() {
		return "blue";
	}
});

module.exports = App;
