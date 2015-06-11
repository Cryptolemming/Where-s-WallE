/** @jsx React.DOM */

'use strict';

var Card = React.createClass({displayName: "Card",
	getInitialState: function() {
		return {
			flipped: false,
		}
	},
	onCardClick: function(evt) {
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
			React.createElement("li", {className: "game-card", onClick: this.onCardClick, style: flip})
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
			board.push(React.createElement(Card, {key: i, pic: imagesShuffled[i]}));
		}
		return React.createElement("div", {className: "game-card"}, React.createElement("ul", {className: "grid"}, board));
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board-container'));
