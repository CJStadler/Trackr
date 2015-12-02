var React = require('react');

var GetAthleteForm = React.createClass({
    getInitialState: function() {
        return {tfrrs_id: ''};
    },

    update_id: function(event) {
        this.setState({tfrrs_id: event.target.value});
    },

    get_athlete: function(e) {
		e.preventDefault();
		var id = this.state.tfrrs_id;
		console.log(id);
        this.props.add_athlete(id);
	},

    render: function() {
        return (
            <form id='get-url' action="/" method="GET" onSubmit={this.get_athlete}>
                <label htmlFor="tfrrs_id">tffrs.org/athletes/</label>
                <input type="text" name="tfrrs_id" id="tfrrs_id"
                    value={this.state.tfrrs_id}
                    onChange={this.update_id}/>
                <input type="submit" value="Get Data" />
            </form>
        )
    }
});

module.exports = GetAthleteForm;
