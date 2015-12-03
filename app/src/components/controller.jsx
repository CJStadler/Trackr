var React = require('react'),
    GetAthleteForm = require('./get_athlete_form.js'),
    AthletesKey = require('./athletes_key.js');

var Controller = React.createClass({
    render: function() {
        return (
            <section id='top-bar'>
                <GetAthleteForm add_athlete={this.props.add_athlete} />
                <AthletesKey
                    athletes={this.props.athletes}
                    set_athlete_state={this.props.set_athlete_state} />
            </section>
        );
    }
});

module.exports = Controller
