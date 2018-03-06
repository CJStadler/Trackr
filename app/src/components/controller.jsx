var React = require('react'),
  GetAthleteForm = require('./get_athlete_form.js'),
  AthletesKey = require('./athletes_key.js'),
  LineTypeForm = require('./line_type_form.js');

var Controller = React.createClass({
  render: function() {
    return (
      <section id='top-bar'>
        <GetAthleteForm add_athlete={this.props.add_athlete} />
        <AthletesKey
          athletes={this.props.athletes}
          set_athlete_state={this.props.set_athlete_state} />
        <LineTypeForm line_type={this.props.line_type} set_line_type={this.props.set_line_type} />
      </section>
    );
  }
});

module.exports = Controller
