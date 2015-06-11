/** @jsx React.DOM */

'use strict';

var Card = React.createClass({displayName: "Card",
	onClickHandler: function(evt) {
		return this.props.onClick(this.props.cardIndex)
	},
	render: function() {
		var unflipped = {
			background: '#bababa',
			backgroundSize: 'cover',
			opacity: '.96',
		};
		var flipped = {
			backgroundImage: 'url(images/' + this.props.image + ')',
			backgroundSize: 'cover',
		};
		var flip = this.props.flipped ? flipped : unflipped;
		return (
			React.createElement("li", {className: "game-card", onClick: this.onClickHandler, style: flip})
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",
	shuffledImages: function(array) {
		var newArray = [];
		for (var i = 0; i < 6; i += 1) {
			newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
		}
		return newArray;
	},
	boardCreation: function() {
		var board = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Card, {key: i, onClick: this.onCardFlip, image: this.imagesArray[i], flipped: this.flipped[i], cardIndex: i}));
		}; 
		return board;
	},
	imagesArray: function() {
		var images = this.shuffledImages(['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg']);
		return images;
	},
	flipped: function() {
		var flipped = [false, false, false, false, false, false];
		return flipped;
	},
	getInitialState: function() {
		return {
			flipped: this.flipped,
			counter: 0,
			imagesArray: this.imagesArray(),
			board: this.boardCreation(),
			flippedImages: [],
			walleCount: 0,
		}
	},
	onCardFlip: function(cardIndex) {
		var currentState = this.state.flipped;
		currentState[cardIndex] = true;
		var currentFlipped = this.state.flippedImages;
		currentFlipped[cardIndex] = this.state.imagesArray[cardIndex];
		var count = this.state.walleCount;
		if (this.state.imagesArray[cardIndex] == 'walle.jpg') {
			count += 1;
		}
		this.setState({
			flipped: currentState,
			flippedImages: currentFlipped,
			walleCount: count,
			counter: this.state.counter += 1,
		})
	},
	render: function() {
		return React.createElement("div", {className: "game-board"}, React.createElement("ul", {className: "grid"}, this.state.board), this.state.flippedImages, this.state.walleCount, this.state.counter);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board-container'));
