/** @jsx React.DOM */

'use strict';

var Card = React.createClass({displayName: "Card",
	onClickHandler: function(evt) {
		return this.props.onClick(this.props.cardIndex)
	},
	render: function() {
		var styling = this.props.styling(this.props.image, this.props.flipped);
		return (
			React.createElement("li", {className: "game-card", onClick: this.onClickHandler, style: styling})
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",
	shuffleImages: function(array) {
		var newArray = [];
		for (var i = 0; i < 6; i += 1) {
			newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
		}
		return newArray;
	},
	styling: function(images, flipped) {
		if (flipped == false) {
			return {
				background: '#bababa',
				backgroundSize: 'cover',
				opacity: '.96',
			};
		} else if (flipped == true) {
			return {
				backgroundSize: 'cover',
				backgroundImage: 'url(images/' + image + ')',
				opacity: '.96',
			};
		}
	},
	boardCreation: function (images, flipped) {
	    images = images || this.state.imagesArray;
	    flipped = flipped || this.state.flipped;
	    var self = this;
	    return images.map(function (image, i) {
	         return React.createElement(Card, {key: i, onClick: self.onCardFlip, image: image, styling: self.styling, image: image, flipped: flipped[i], cardIndex: i});
	    });
	},
	getInitialState: function() {
	    var images = this.shuffleImages(['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg']);
	    var flipped = [false, false, false, false, false, false];
	    return {
	        imagesArray: images,
	        flipped: flipped,
	        imagesFlipped: [],
	        board: this.boardCreation(images, flipped),   
	    };
	},
	onCardFlip: function(cardIndex) {
		var currentStateFlipped = this.state.flipped;
		currentStateFlipped[cardIndex] = true;
		var currentImagesFlipped = this.state.imagesFlipped;
		currentImagesFlipped[cardIndex] = this.state.imagesArray[cardIndex];
		var currentImagesArray = this.state.imagesArray;
		var updatedBoard = this.boardCreation(currentImagesArray, currentStateFlipped);
		this.setState({
			flipped: currentStateFlipped,
			imagesFlipped: currentImagesFlipped,
			board: updatedBoard,
		})
		this.gameOver();
	},
	gameOver: function() {
		if (this.state.imagesFlipped.reduce(function(n, val) { return n + (val == 'walle.jpg') }, 0) >= 2) {
			return this.newGame();
		}
	},
	newGame: function() {
		var images = this.shuffleImages(['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg']);
		var flipped = [false, false, false, false, false, false];
		var newBoard = this.boardCreation(images, flipped);
		return this.setState({
			imagesArray: images,
	        flipped: flipped,
	        imagesFlipped: [],
	        walleCount: 0,
	        board: newBoard,
		});
	},
	render: function() {
		return React.createElement("div", {className: "game-board"}, React.createElement("ul", {className: "grid"}, this.state.board), this.state.imagesFlipped);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board-container'));
