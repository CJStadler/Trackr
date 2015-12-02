var React = require('react'),
    GetAthleteForm = require('./get_athlete_form.js'),
    AthletesKey = require('./athletes_key.js');

var Controller = React.createClass({displayName: "Controller",
    render: function() {
        return (
            React.createElement("section", {id: "top-bar"}, 
                React.createElement(GetAthleteForm, {add_athlete: this.props.add_athlete}), 
                React.createElement(AthletesKey, {remove_athlete: this.props.remove_athlete})
            )
        );
    }
});

module.exports = Controller
