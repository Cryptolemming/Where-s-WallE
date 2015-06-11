/** @jsx React.DOM */

'use strict';

var Pic = React.createClass({displayName: "Pic",
	render: function() {
		return (
			React.createElement("li", {className: "game-block game-pic"})
		);
	}
});

var Block = React.createClass({displayName: "Block",
	render: function() {
		return (
			React.createElement("li", {className: "game-block"})
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
			flipped: false,
			count: 0,
			array: this.shuffle(['images/walle.jpg', 'eve.jpg', 'john.jpg', 'walle.jpg', 'captain.jpg', 'mary.jpg']),
		}
	},
	onBlockClick: function(evt) {
		this.setState({
			flipped: true,
			count: this.state.count += 1,
			pic: this.state.array[0],
		})	
	},
	render: function() {
		var unflipped = {
			background: 'blue',
		};
		var flipped = {
			backgroundImage: 'url(images/' + this.state.array[0] + ')',
		};
		var flip = this.state.flipped ? flipped : unflipped;
		var board = [];
		var pics = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Block, {key: i}));
			pics.push(this.state.array[i]);
		}
		return React.createElement("ul", {className: "grid"}, board, pics);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board'));

