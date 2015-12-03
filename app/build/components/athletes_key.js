var React = require('react'),
    AthleteLabel = require('./athlete_label.js');

var AthletesKey = React.createClass({displayName: "AthletesKey",
    render: function() {
        var labels = this.props.athletes.map(function(athlete) {
            return (
                React.createElement(AthleteLabel, {
                    athlete: athlete, 
                    key: athlete.id, 
                    set_athlete_state: this.props.set_athlete_state})
            );
        }.bind(this));
        return (
            React.createElement("div", {id: "athletes-key"}, 
                labels
            )
        );
    }
});

module.exports = AthletesKey;
