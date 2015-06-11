/** @jsx React.DOM */

'use strict';


var GameOn = React.createClass({displayName: "GameOn",
	getInitialState: function() {
		return {
			newGame: false,
		}
	},
	onButtonClick: function(evt) {
		this.setState({
			newGame: true,
		})
	},
	render: function() {
		return React.createElement("button", {className: "newgame", onClick: this.onBlockClick});
	}
});

var Block = React.createClass({displayName: "Block",
	getInitialState: function() {
		return {
			flipped: false,
		}
	},
	onBlockClick: function(evt) {
		this.setState({
			flipped: true,
		})	
	},
	render: function() {
		var unflipped = {
			background: 'blue',
		};
		var flipped = {
			backgroundImage: 'url(images/' + this.props.pic + ')',
			backgroundSize: 'cover',
		};
		var flip = this.state.flipped ? flipped : unflipped;
		return (
			React.createElement("li", {className: "game-block", onClick: this.onBlockClick, style: flip})
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
	render: function() {
		var images = ['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg'];
		var imagesShuffled = this.shuffle(images);
		var board = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Block, {key: i, pic: imagesShuffled[i]}));
		}
		return React.createElement("ul", {className: "grid"}, board);
	}
});

var Game = React.createClass({displayName: "Game",
	getInitialState: function() {
		return {
			gameOver: false,
			newGame: true,
		}
	},
	onGameOver: function() {
		this.setState({
			gameOver: true,
			newGame: true,
		})
	},
	render: function() {

		if (this.state.newGame) return React.createElement(GameBoard, null);		
	}
});

React.render(React.createElement(Game, {GameOn: true}), document.getElementById('game-board'));

