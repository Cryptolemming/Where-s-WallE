/** @jsx React.DOM */

'use strict';

var React = require('react');

var Blocks = React.createClass({displayName: "Blocks",
	render() {
		return React.createElement("div", null);
	}
});

React.render(React.createElement(Hello, null), document.getElementById('game-board'));
