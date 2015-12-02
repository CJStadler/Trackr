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
				<ChartsDisplay />
			</div>
		);
	},

	add_athlete: function(athlete) {
		var athletes = this.state.athletes.slice();
		athletes.push(athlete);
		this.setState({athletes: athletes});
		console.log("adding athlete: " + athlete.name)
	},
});

module.exports = App;
