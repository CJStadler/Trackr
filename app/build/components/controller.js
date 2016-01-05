var React = require('react'),
    GetAthleteForm = require('./get_athlete_form.js'),
    AthletesKey = require('./athletes_key.js'),
    LineTypeForm = require('./line_type_form.js');

var Controller = React.createClass({displayName: "Controller",
    render: function() {
        return (
            React.createElement("section", {id: "top-bar"}, 
                React.createElement(GetAthleteForm, {add_athlete: this.props.add_athlete}), 
                React.createElement(AthletesKey, {
                    athletes: this.props.athletes, 
                    set_athlete_state: this.props.set_athlete_state}), 
                React.createElement(LineTypeForm, {line_type: this.props.line_type, set_line_type: this.props.set_line_type})
            )
        );
    }
});

module.exports = Controller
