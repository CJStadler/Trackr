var React = require('react'),
    Chart = require('./chart.js');

var Panel = React.createClass({displayName: "Panel",

    render: function() {
        var panel;
        if (this.props.active) {
            panel = (
                React.createElement("div", {className: "panel", id: this.get_id(), key: this.props.event.name}, 
                    React.createElement("div", {className: "close-panel", onClick: this.close_panel}, "x"), 
                    React.createElement("h1", null, this.props.event.name), 
                    React.createElement(Chart, {event: this.props.event, athletes: this.props.athletes, line_type: this.props.line_type})
                )
            );
        } else {
            panel = (
                React.createElement("div", {className: "panel disabled", id: this.get_id(), key: this.props.event.name, onClick: this.open_panel}, 
                    React.createElement("h1", null, "+ " + this.props.event.name)
                )
            );
        }

        return panel;
    },

    get_id: function() {
        return "panel-" + this.props.event.name.replace(',', '');
    },

    close_panel: function() {
        this.props.disable_event(this.props.event.name);
    },

    open_panel: function() {
        this.props.activate_event(this.props.event.name);
    }
});

module.exports = Panel;
