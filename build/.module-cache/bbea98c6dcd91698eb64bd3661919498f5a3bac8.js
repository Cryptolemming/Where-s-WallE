/** @jsx React.DOM */

'use strict';

var React = require('react');

var Blocks = React.createClass({displayName: "Blocks",
	render() {
		return React.createElement("div", {class: "game=block"});
	}
});

React.render(React.createElement(Blocks, null), document.getElementById('game-board'));
