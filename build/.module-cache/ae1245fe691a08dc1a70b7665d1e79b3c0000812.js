/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	getInitialState: function() {
		return {
			flipped: false
		}
	},
	onBlockClick: function(evt) {
		this.setState({
			flipped: true,
		})	
	},
	render: function() {
		var styleFlipped = {
			backgroundSize: 'cover',
		};
		var styleDefault = {
			background: 'blue',
		};
		var flip = this.state.flipped ? this.state.teststyle : styleDefault;
		return (
			React.createElement("li", {className: "game-block", onClick: this.onBlockClick, style: flip}, this.state)
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",
	getInitialState: function() {
		return {
			images: ['walle.jpg', 'eve.jpg', 'john.jpg', 'walle.jpg', 'captain.jpg', 'mary.jpg'],
		}
	},
	onBlockClick: function(evt) {
		this.setState({
			images: this.state.images.splice(Math.floor(Math.random() * this.state.images.length), 1),
		})
	},
	render: function() {
		var board = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Block, {key: i, onClick: this.onBlockClick}));
		}
		return React.createElement("ul", {className: "grid"}, board);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board'));

