Trackr
======

A web application for visualizing Track &amp; Field athlete data.

Generates charts displaying an athlete's progression in each of their events. Additional athletes can be added for comparison.

Data is from tfrrs.org.

Visualizations are generated using d3.js.

Currently hosted at http://trackr.cjstadler.com


React implementation
====================

take athlete ids as params, prerender on server.

history.pushState()?

Server side render like?

app = appReactComponent(parameters)
page = React.renderToString(app)
res.send(page)