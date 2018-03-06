# Trackr

A web application for visualizing Track & Field athlete data.

Generates charts displaying an athlete's progression in each of their events.
Multiple athletes can be added for comparison.

Data is from [tfrrs.org](https://tfrrs.org).

Visualizations are generated using d3.js.

Hosted at [trackr.cjstadler.com](http://trackr.cjstadler.com).

## Setup
Install dependencies: `npm install`
Build: `npm run build`
Development server: `npm run dev`
Watch for changes and build: `npm run watch:jsx` and `npm run watch:bundle`.

## React implementation

take athlete ids as params, prerender on server.

history.pushState()?

Server side render like?

app = appReactComponent(parameters)
page = React.renderToString(app)
res.send(page)
