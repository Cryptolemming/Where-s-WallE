/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	
	render: function() {
		
		return (
			React.createElement("li", {className: "game-block", onClick: this.onBlockClick})
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",
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
			array: this.state.array.slice(this.state.pic, 1),
		})	
	},
	render: function() {
		var unflipped = {
			background: 'blue',
		};
		var flipped = {
			backgroundImage: 'url(images/' + this.state.pic + ')',
		};
		var flip = this.state.flipped ? flipped : unflipped;
		var board = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Block, {key: i, onClick: this.onBlockClick, style: flip}));
		}
		return React.createElement("ul", {className: "grid"}, board);
	}
});

React.render(React.createElement(GameBoard, {onClick: this.onBlockClick, style: flip}), document.getElementById('game-board'));

