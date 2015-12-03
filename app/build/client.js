var React = require('react'),
	ReactDOM = require('react-dom'),
	iso = require('iso'),
	App = require('./app.js');

// Run react on the client against the HTML generated on the server
iso.bootstrap(function (state, _, container) {
	console.log(state);
	ReactDOM.render(React.createElement(App, {athletes: state.athletes}), container);
	//ReactDOM.render(<App />, document.getElementById('app'));
});
