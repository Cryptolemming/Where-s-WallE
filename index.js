import React from 'react';
import ReactDOM from 'react-dom';

'use strict';

const CARDS = ['k3xkgdci3h9mlnf/walle.jpg?dl=0', 'k3xkgdci3h9mlnf/walle.jpg?dl=0', '1ll4rd0q28y7is8/eve.jpg?dl=0', '7sbiokkeq2hnaze/john.jpg?dl=0', '93ltebnju2vd5ns/captain2.jpg?dl=0', 'uho6nbflui260ca/mary.jpg?dl=0'];

var Card = React.createClass({
	// takes in an image, flipped truthiness, and onPress flipped function as props
	propTypes: {
		image: React.PropTypes.string.isRequired,
		flipped: React.PropTypes.bool.isRequired,
		onPress: React.PropTypes.func.isRequired,
	},

	render: function() {
		var flipStyling = this.props.flipped ? styles.cardFlipped : styles.card;

		return(
			<div onPress={this.props.onPress()}>
				<img
					className='game-card'
					source='https://dl.dropboxusercontent.com/s/' + this.props.image />
			</div>
		);
	}
});

/**
var newGameButton = React.createClass({
	propTypes: {
		active: React.PropTypes.bool.isRequired,
	}
});

var winModal = React.createClass({
	propTypes: {
		render: React.PropTypes.bool.isRequired,
	}
});
**/

var Game = React.createClass({
	// takes the images array as a prop from the main component
	propTypes: {
		images: React.PropTypes.array.isRequired,
	},

	// shuffles the images for the cards
	_shuffleImages(images) {
		var currentIndex = images.length, temporaryValue, randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * images.length);
			currentIndex -= 1;

			// swap a random value with a value at the back
			temporaryValue = images[currentIndex];
			images[currentIndex] = images[randomIndex];
			images[randomIndex] = temporaryValue;
		}

		return images;
	},

	// the initial state is that initial card data object
	getInitialState() {
		var startingImages = this._shuffleImages(this.props.images);
		var flippedValues = [false, false, false, false, false, false];
		console.log(startingImages);
		return {
			shuffledCards: startingImages,
			flippedValues: flippedValues,
			flippedImages: [],
		};
	},

	// when a card is pressed, update state truthiness for the card being flipped
	_onPress(image, index) {
		var updateFlippedValues = this.state.flippedValues;
		updateFlippedValues[index] = true;
		var updateFlippedImages = this.state.flippedImages;
		updateFlippedImages[index] = this.state.shuffledCards[index];
		this.setState({
			flippedValues: updateFlippedValues,
			flippedImages: updateFlippedImages,
		});
	},

	render: function() {
		var board = this.state.shuffledCards.map((card, index) => {
			return <Card image={card} key={index} onPress={this._onPress} flipped={this.state.flippedValues[index]} />
		});
		return(
			<div style={styles.boardContainer}>
				{board}
			</div>
		);
	}
});

ReactDOM.render(<Game images=CARDS />, document.getElementById('container'));