var React = require('react');
var ChartsDisplay = require('./components/charts_display.js');
var Controller = require('./components/controller.js');

var App = React.createClass({

	getInitialState: function() {
		return {
			athletes: []
		};
    },

	componentWillReceiveProps: function(new_props) {
		this.setState(new_props);
	},

	render: function() {
		return (
			<div>
				<Controller
					athletes={this.state.athletes}
					add_athlete={this.add_athlete}
					remove_athlete={this.remove_athlete}/>
				<ChartsDisplay data={this.state} />
			</div>
		);
	},

	add_athlete: function(athlete) {
		console.log("adding athlete: " + athlete)
	},
});

module.exports = App;
