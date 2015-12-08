var React = require('react'),
    Chart = require('./chart.js');

var Panel = React.createClass({

    render: function() {
        var panel;
        if (this.props.active) {
            panel = (
                <div className='panel' id={this.get_id()} key={this.props.event.name}>
                    <div className='close-panel' onClick={this.close_panel}>x</div>
                    <h1>{this.props.event.name}</h1>
                    <Chart event={this.props.event} athletes={this.props.athletes} />
                </div>
            );
        } else {
            panel = (
                <div className='panel disabled' id={this.get_id()} key={this.props.event.name} onClick={this.open_panel}>
                    <h1>{"+ " + this.props.event.name}</h1>
                </div>
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
