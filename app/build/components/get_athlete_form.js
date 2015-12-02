var React = require('react');

var GetAthleteForm = React.createClass({displayName: "GetAthleteForm",
    get_athlete: function(e) {
		e.preventDefault();
		var url = this.refs.tfrrs_url.getDOMNode().value;
		console.log(url);
        this.props.add_athlete(url);
	},
    render: function() {
        return (
            React.createElement("form", {id: "get-url", action: "/", method: "GET", onSubmit: this.get_athlete}, 
                React.createElement("label", {htmlFor: "tfrrs_url"}, "tffrs.org/athletes/"), 
                React.createElement("input", {type: "text", name: "tfrrs_url", id: "tfrrs_url", ref: "tfrrs_url"}), 
                React.createElement("input", {type: "submit", value: "Get Data"})
            )
        )
    }
});

module.exports = GetAthleteForm;
