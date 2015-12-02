var React = require('react'),
	App = require('./app.js');

// Run react on the client against the HTML generated on the server
React.render(
    React.createElement(App, null), document.getElementById('app')
);
