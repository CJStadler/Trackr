var React = require('react'),
	ReactDOM = require('react-dom'),
	App = require('./app.js');

// Run react on the client against the HTML generated on the server
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
