var React = require('react'),
  AthleteLabel = require('./athlete_label.js');

var AthletesKey = React.createClass({
  render: function() {
    var labels = this.props.athletes.map(function(athlete) {
      return (
        <AthleteLabel
          athlete={athlete}
          key={athlete.id}
          set_athlete_state={this.props.set_athlete_state} />
      );
    }.bind(this));

    return (
      <div id="athletes-key">
          {labels}
      </div>
    );
  }
});

module.exports = AthletesKey;
