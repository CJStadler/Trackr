var React = require('react');

var AthleteLabel = React.createClass({
  render: function() {
    var id = "athlete-" + this.props.athlete.id;
    return (
      <div className='label'>
        <input
          type='checkbox'
          id={id}
          checked={this.props.athlete.active}
          onChange={this.toggle_athlete}/>
        <label htmlFor={id}>
          {this.props.athlete.name}
          <span
            className='color-label'
            style={{backgroundColor: this.props.athlete.color}} />
        </label>
      </div>
    );
  },

  toggle_athlete: function() {
    this.props.set_athlete_state(this.props.athlete.id, !this.props.athlete.active);
  },
});

module.exports = AthleteLabel;
