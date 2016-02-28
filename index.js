import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';

'use strict';

const CARDS = ['k3xkgdci3h9mlnf/walle.jpg?dl=0', 'epmgt0g9on02unj/walle2.jpg?dl=0', '1ll4rd0q28y7is8/eve.jpg?dl=0', '7sbiokkeq2hnaze/john.jpg?dl=0', '93ltebnju2vd5ns/captain2.jpg?dl=0', 'uho6nbflui260ca/mary.jpg?dl=0'];

var styles = {
	card: {
		cursor: 'pointer',
		float: 'left',
		borderRadius: '50%',
		width: '21%',
		height: '23%',
		opacity: '.96',
		marginLeft: '4%',
		marginBottom: '4%',
		marginTop: '2%',
	    boxShadow: 'inset 5px 5px 15px #000',
	    border: '1px solid black',
	    ':hover': {
	    	backgroundColor: 'purple',
	    }
	}
};

var Card = Radium(React.createClass({
	// takes in an image, flipped truthiness, and onPress flipped function as props
	propTypes: {
		image: React.PropTypes.string.isRequired,
		flipped: React.PropTypes.bool.isRequired,
		onClick: React.PropTypes.func.isRequired,
	},

	_onClickHandler: function() {
		this.props.onClick(this.props.image)
	},

	render: function() {
		var styleFlipped
			= this.props.flipped
			? {backgroundImage: 'url(https://dl.dropboxusercontent.com/s/' + this.props.image + ')',
			   backgroundSize: 'cover'}
			: {backgroundColor: 'gray'};

		return(
				<li
					onClick={this._onClickHandler}
					style={[styles.card, styleFlipped]}>
				</li>
		);
	}
}));

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

var Game = Radium(React.createClass({
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
	_onClick(image) {
		var cardIndex = this.state.shuffledCards.indexOf(image);

		var updateFlippedValues = this.state.flippedValues;
		updateFlippedValues[cardIndex] = true;
		var updateFlippedImages = this.state.flippedImages;
		updateFlippedImages[cardIndex] = this.state.shuffledCards[cardIndex];
		this.setState({
			flippedValues: updateFlippedValues,
			flippedImages: updateFlippedImages,
		});
	},

	render: function() {
		var board = this.state.shuffledCards.map((card, index) => {
			return <Card image={card} key={card} onClick={this._onClick} flipped={this.state.flippedValues[index]} />
		});
		return(
			<div className='game-container'>
				<div className='game-info'>
					<ul className='game-counters'>
						<li className='x-counter'>X</li>
						<li></li>
						<li><img className='walle-counter' src='https://dl.dropboxusercontent.com/s/k3xkgdci3h9mlnf/walle.jpg?dl=0' /></li>
						<li></li>
						
					</ul>
				</div>
				<div className='game-board'>
					<ul clasName='grid'>
						{board}
						{console.log(this.state.flippedValues, this.state.flippedImages)}
					</ul>
				</div>
				<div className='info'>
					<a href='http://aliayoub.com'>
						<p className='about' target='_blank'>created by Ali Ayoub</p>
					</a>
					<p className='copyright'>All artwork and the name Wall-E are property of 
						<a href='http://www.pixar.com/' className='pixar'> Pixar</a>
					</p>
				</div>
			</div>
		);
	}
}));

ReactDOM.render(<Game images={CARDS} />, document.getElementById('container'));