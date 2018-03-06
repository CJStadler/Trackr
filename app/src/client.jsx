var React = require('react'),
	ReactDOM = require('react-dom'),
	iso = require('iso'),
	App = require('./app.js');

// Run react on the client against the HTML generated on the server
iso.bootstrap(function (state, _, container) {
	console.log(state);
	ReactDOM.render(<App athletes={state.athletes}/>, container);
	//ReactDOM.render(<App />, document.getElementById('app'));
});

// make the controller sticky
var init_sticky = function() {
	var bar = document.getElementById("top-bar");
  var sticky_class = "sticky";
	var content = document.getElementById('app');
	var header = document.getElementById("masthead");

	var header_height = header.offsetHeight;
	var header_style = getComputedStyle(header);
	header_height += parseInt(header_style.marginTop) + parseInt(header_style.marginBottom);

	var bar_height = bar.offsetHeight;
	var bar_style = getComputedStyle(bar);
	bar_height += parseInt(bar_style.marginTop) + parseInt(bar_style.marginBottom);

	window.addEventListener("scroll", function() {
		if (document.body.scrollTop > header_height) {
			bar.classList.add(sticky_class);
			content.style.paddingTop = bar_height + "px";
		} else {
			bar.classList.remove(sticky_class);
			content.style.paddingTop = "";
		}
	});
};

init_sticky();
