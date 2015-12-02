var React = require('react'),
    GetAthleteForm = require('./get_athlete_form.js'),
    AthletesKey = require('./athletes_key.js');

var Controller = React.createClass({
    render: function() {
        return (
            <section id='top-bar'>
                <GetAthleteForm add_athlete={this.props.add_athlete} />
                <AthletesKey remove_athlete={this.props.remove_athlete} />
            </section>
        );
    }
});

module.exports = Controller
