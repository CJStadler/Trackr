var React = require('react');

var GetAthleteForm = React.createClass({
    get_athlete: function(e) {
		e.preventDefault();
		var url = this.refs.tfrrs_url.getDOMNode().value;
		console.log(url);
        this.props.add_athlete(url);
	},
    render: function() {
        return (
            <form id='get-url' action="/" method="GET" onSubmit={this.get_athlete}>
                <label htmlFor="tfrrs_url">tffrs.org/athletes/</label>
                <input type="text" name="tfrrs_url" id="tfrrs_url" ref="tfrrs_url"/>
                <input type="submit" value="Get Data" />
            </form>
        )
    }
});

module.exports = GetAthleteForm;
