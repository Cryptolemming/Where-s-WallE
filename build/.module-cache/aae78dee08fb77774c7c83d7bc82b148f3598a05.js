/** @jsx React.DOM */

'use strict';

var Blocks = React.createClass({displayName: "Blocks",
	render() {
		for (var i = 0; i < 3; i+=1) {
			return React.createElement("div", {className: "game-block"});
		};
	}
});

React.render(React.createElement(Blocks, null), document.getElementById('game-board'));
