var React = require('react');

var AthleteLabel = React.createClass({displayName: "AthleteLabel",
  render: function() {
    var id = "athlete-" + this.props.athlete.id;
    return (
      React.createElement("div", {className: "label"}, 
        React.createElement("input", {
          type: "checkbox", 
          id: id, 
          checked: this.props.athlete.active, 
          onChange: this.toggle_athlete}), 
        React.createElement("label", {htmlFor: id}, 
          this.props.athlete.name, 
          React.createElement("span", {
            className: "color-label", 
            style: {backgroundColor: this.props.athlete.color}})
        )
      )
    );
  },

  toggle_athlete: function() {
    this.props.set_athlete_state(this.props.athlete.id, !this.props.athlete.active);
  },
});

module.exports = AthleteLabel;
