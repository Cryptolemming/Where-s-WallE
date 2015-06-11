/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	render: function() {
		return (
			React.createElement("li", {className: "game-block"})
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",
	render: function() {
		
		var styleDefault = {
			background: 'blue',
		};
		var styleFlipped = {
			background: 'red',
		};
		var flip = this.state.flipped ? styleFlipped : styleDefault;
		var board = [];
		for (var i = 0; i < 3; i+=1) {
			board.push(React.createElement(Block, {key: i}));
		}
		return React.createElement("ul", {className: "grid"}, board);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board'));

