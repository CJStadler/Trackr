var React = require('react');

var GetAthleteForm = React.createClass({displayName: "GetAthleteForm",
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
            React.createElement("form", {id: "get-url", action: "/", method: "GET", onSubmit: this.get_athlete}, 
                React.createElement("label", {htmlFor: "tfrrs_id"}, "tffrs.org/athletes/"), 
                React.createElement("input", {type: "text", name: "tfrrs_id", id: "tfrrs_id", 
                    value: this.state.tfrrs_id, 
                    onChange: this.update_id}), 
                React.createElement("input", {type: "submit", value: "Get Data"})
            )
        )
    }
});

module.exports = GetAthleteForm;
