/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	shuffle: function(array) {
		function imagesShuffle(array) {
			var newArray = [];
			for (var i = 0; i < this.array.length; i += 1) {
				newArray.push(this.array.splice(Math.floor(Math.random() * this.array.length), 1));
			}
			return newArray;
		}
	},
	getInitialState: function() {
		return {
			flipped: false,
			array: ['walle.jpg', 'eve.jpg', 'john.jpg', 'walle.jpg', 'captain.jpg', 'mary.jpg'],
		}
	},
	onBlockClick: function(evt) {
		this.setState({
			flipped: true,
			pic: this.state.array[0],
			array: this.state.array.slice(pic, 1),
		})	
	},
	render: function() {
		var unflipped = {
			background: 'blue',
		}
		var flip = this.state.flipped ? 'background: url(/images' + this.state.pic + ')' : unflipped;
		return (
			React.createElement("li", {className: "game-block", onClick: this.onBlockClick, style: flip}, this.state.array)
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

