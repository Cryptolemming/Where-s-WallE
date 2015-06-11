/** @jsx React.DOM */

'use strict';

var Blocks = React.createClass({displayName: "Blocks",
	render() {
		return React.createElement("div", {class: "game=block"});
	}
});

React.render(React.createElement(Blocks, null), document.getElementById('game-board'));
