var React = require('react');

var LineTypeForm = React.createClass({displayName: "LineTypeForm",
    render: function() {
        var checkboxes = ["all connected", "PRs"].map(function(type) {
            var set_state = function() {
                this.props.set_line_type(type);
            }.bind(this);

            return (
                React.createElement("span", {key: type}, 
                    React.createElement("input", {
                        type: "checkbox", 
                        id: "type-" + type, 
                        checked: type === this.props.line_type, 
                        value: type, 
                        onChange: set_state}), 
                    React.createElement("label", {htmlFor: "type-" + type}, type)
                )
            );
        }.bind(this));
        return (
            React.createElement("div", null, 
                checkboxes
            )
        );
    }
})

module.exports = LineTypeForm;
