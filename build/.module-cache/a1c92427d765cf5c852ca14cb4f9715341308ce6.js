/** @jsx React.DOM */

'use strict';


var Hello = React.createClass({displayName: "Hello",
	render() {
		return React.createElement("p", null, "test");
	}
});

React.render(React.createElement(Hello, null), document.getElementById('game-board'));
