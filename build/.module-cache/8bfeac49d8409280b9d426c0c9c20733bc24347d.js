/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	render() {
		return React.createElement("div", {className: "game-block"});
	}
});

var row = [];
for (var i = 0; i < 3; i+=1) {
	row.push(React.createElement(Block, null));
}

React.render(React.createElement("row", null), document.getElementById('game-board'));
