var React = require('react'),
    Chart = require('./chart.js');

var ChartsDisplay = React.createClass({

    getInitialState: function() {
        return {excluded_events: []};
    },

    render: function() {
        var charts = this.props.events.map(function(event) {
            return (
                <div className='panel' id={"panel-" + event.name.replace(',', '')} key={event.name}>
                    <div className='close-panel'>x</div>
                    <h1>{event.name}</h1>
                    <Chart event={event} athletes={this.props.athletes} />
                </div>
            );
        }.bind(this));
        return <div id="charts-display">{charts}</div>;
    }

    // Get the names of all the events for which we have races
    // event_names: function() {
    //     var events = [];
    //     // TODO: more efficient search?
    //     this.props.athletes.forEach(function(a) {
    //         a.races.forEach(function(r) {
    //             if (events.indexOf(r.event) === -1) {
    //                 events.push(r.event);
    //             }
    //         });
    //     });
    //
    //     return events;
    // },


});

module.exports = ChartsDisplay;
