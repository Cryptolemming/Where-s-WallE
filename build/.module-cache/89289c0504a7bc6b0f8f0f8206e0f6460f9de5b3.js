/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	getInitialState: function() {
		return {
			flipped: false,
		};
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
			background: 'red',
		};
		var flip = this.state.flipped ? flipped : unflipped;
		return (
			React.createElement("li", {className: "game-block", onClick: this.onBlockFlip, style: flip}, this.state.array)
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",
	shuffle: function(array) {
		var newArray = [];
		for (var i = 0; i < 6; i += 1) {
			newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
		}
		return newArray;
	},
	getInitialState: function() {
		return {
			array: this.shuffle(['walle.jpg', 'eve.jpg', 'john.jpg', 'walle.jpg', 'captain.jpg', 'mary.jpg']),
		}
	},
	onBlockFlip: function(evt) {
		this.setState({
			pic: this.state.array[0],
			array: this.state.array.slice(this.state.pic, 1),
		})	
	},
	render: function() {
		var board = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Block, {key: i, onClick: this.onBlockFlip}));
		}
		return React.createElement("ul", {className: "grid"}, board, this.state.array);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board'));

