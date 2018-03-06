var React = require('react');

var LineTypeForm = React.createClass({
  render: function() {
    var checkboxes = ["all connected", "PRs"].map(function(type) {
      var set_state = function() {
        this.props.set_line_type(type);
      }.bind(this);

      return (
        <span key={type}>
          <input
            type='checkbox'
            id={"type-" + type}
            checked={type === this.props.line_type}
            value={type}
            onChange={set_state} />
          <label htmlFor={"type-" + type}>{type}</label>
        </span>
      );
    }.bind(this));
    return (
      <div>
        {checkboxes}
      </div>
    );
  }
})

module.exports = LineTypeForm;
