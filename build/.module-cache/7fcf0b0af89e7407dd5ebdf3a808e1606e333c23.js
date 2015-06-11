/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	
	render: function() {
		
		return (
			React.createElement("li", {className: "game-block", onClick: this.onBlockClick, style: this.flip})
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",
	shuffle: function(array) {
		var newArray = [];
		for (var i = 0; i < array.length; i += 1) {
			newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
		}
		return newArray;
	},
	getInitialState: function() {
		return {
			flipped: false,
			array: this.shuffle(['walle.jpg', 'eve.jpg', 'john.jpg', 'walle.jpg', 'captain.jpg', 'mary.jpg']),
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
			board.push(React.createElement(Block, {key: i}));
		}
		return React.createElement("ul", {className: "grid"}, this.shuffle.newArray);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board'));

