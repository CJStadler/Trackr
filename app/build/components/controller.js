var React = require('react'),
    GetAthleteForm = require('./get_athlete_form.js'),
    AthletesKey = require('./athletes_key.js');

var Controller = React.createClass({displayName: "Controller",
    render: function() {
        return (
            React.createElement("section", {id: "top-bar"}, 
                React.createElement(GetAthleteForm, {add_athlete: this.props.add_athlete}), 
                React.createElement(AthletesKey, {
                    athletes: this.props.athletes, 
                    set_athlete_state: this.props.set_athlete_state})
            )
        );
    }
});

module.exports = Controller
