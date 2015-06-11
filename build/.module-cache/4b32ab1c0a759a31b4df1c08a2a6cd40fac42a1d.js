/** @jsx React.DOM */

'use strict';

var Card = React.createClass({displayName: "Card",
	onClickHandler: function(evt) {
		return this.props.onClick(this.props.cardIndex)
	},
	render: function() {
		var cardUnflipped = {
			background: '#bababa',
			backgroundSize: 'cover',
			opacity: '.96',
		};
		var cardFlipped = {
			backgroundImage: 'url(images/' + this.props.image + ')',
			backgroundSize: 'cover',
			opacity: '.96',
		};
		var flip = this.props.flipped? cardFlipped : cardUnflipped;
		return (
			React.createElement("li", {className: "game-card", onClick: this.onClickHandler, style: flip})
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",
	shuffleImages: function(array) {
		var images = ['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg'];
		var newArray = [];
		for (var i = 0; i < 6; i += 1) {
			newArray.push(images.splice(Math.floor(Math.random() * images.length), 1));
		}
		return newArray;
	},
	boardCreation: function (images, flipped) {
	    var images = images || this.state.imagesArray;
	    var flipped = flipped || this.state.flipped;
	    var self = this;
	    return images.map(function (image, i) {
	         return React.createElement(Card, {key: i, onClick: self.onCardFlip, image: image, flipped: flipped[i], cardIndex: i});
	    });
	},
	getInitialState: function() {
	    var images =  this.shuffleImages();
	    var flipped = [false, false, false, false, false, false];
	    return {
	        imagesArray: images,
	        flipped: flipped,
	        imagesFlipped: [],
	        walleCount: 0,
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
		var count = this.state.walleCount;
		if (this.state.imagesArray[cardIndex] == 'walle.jpg') {
			count += 1;
		}
		this.setState({
			flipped: currentStateFlipped,
			imagesFlipped: currentImagesFlipped,
			walleCount: count,
			board: updatedBoard,
		})
	},
	gameOver: function() {
		if (this.state.walleCount == 2) {
			return this.newGame();
		}
	},
	newGame: function(images, flipped) {
		var images = this.shuffleImages();
		var flipped = [false, false, false, false, false, false];
		var newBoard = this.boardCreation(images, flipped);
		this.setState({
			imagesArray: images,
	        flipped: flipped,
	        imagesFlipped: [],
	        walleCount: 0,
	        board: newBoard,
		})
	},
	render: function() {
		return React.createElement("div", {className: "game-board"}, React.createElement("ul", {className: "grid"}, this.state.board));
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board-container'));
