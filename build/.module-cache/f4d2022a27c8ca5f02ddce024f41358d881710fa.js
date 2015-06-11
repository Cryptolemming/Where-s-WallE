/** @jsx React.DOM */

'use strict';

var RandomBackground = React.createClass({displayName: "RandomBackground",
	shuffle: function(array) {
	var newArray = [];
	for (var i = 0; i < array.length; i += 1) {
		newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
	}
	return newArray;
	},
	getInitialState: function() {
		return {
			array: this.shuffle(['walle.jpg', 'eve.jpg', 'john.jpg', 'walle.jpg', 'captain.jpg', 'mary.jpg']),
		}
	},
	getBackground: function() {
		this.setState({
			pic: this.state.array[0],
			array: this.state.array.slice(this.state.pic, 1),
		})	
	},
});

var Block = React.createClass({displayName: "Block",
	getInitialState: function() {
		return {
			flipped: false,
		}
	},
	onBlockFlip: function(evt) {
		this.setState({
			flipped: true,
		})	
	},
	render: function() {
		var unflipped = {
			background: 'blue',
		};
		var flipped = {
			backgroundImage: 'red',
		};
		var flip = this.state.flipped ? flipped : unflipped;
		return (
			React.createElement("li", {className: "game-block", onClick: this.onBlockFlip, style: flip})
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",

	render: function() {
		var board = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Block, {key: i}));
		}
		return React.createElement("ul", {className: "grid"}, board);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board'));

