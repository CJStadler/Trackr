var React = require('react');
var ChartsDisplay = require('./components/charts_display.js');
var Controller = require('./components/controller.js');
var d3 = require('d3');

var App = React.createClass({

	getInitialState: function() {
		return {
			athletes: []
		};
    },

	get_color: d3.scale.category10(),

	componentWillReceiveProps: function(new_props) {
		this.setState(new_props);
	},

	render: function() {
		return (
			<div>
				<Controller
					athletes={this.state.athletes}
					add_athlete={this.add_athlete}
					set_athlete_state={this.set_athlete_state}/>
				<ChartsDisplay />
			</div>
		);
	},

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
