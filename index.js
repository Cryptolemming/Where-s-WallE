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

	_startingImages() {
		return this._shuffleImages(this.props.images);
	},

	// the initial state is that initial card data object
	getInitialState() {
		return {
			shuffledCards: this._startingImages(),
			flippedValues: [false, false, false, false, false, false],
			flippedImages: [],
			walles: 0,
			errors: 0,
			gameOver: false,
		};
	},

	_cardIndex(image) {
		return this.state.shuffledCards.indexOf(image);
	},

	_cardName(image) {
		return this.state.shuffledCards[this._cardIndex(image)];
	},

	_updateFlippedValues(image) {
		var emptyValues = [];
		var updateFlippedValues = emptyValues.concat(this.state.flippedValues);
			updateFlippedValues[this._cardIndex(image)] = true;
		this.setState({
			flippedValues: updateFlippedValues,
		})
	},

	_updateFlippedImages(image) {
		var emptyImages = [];
		var updateFlippedImages = emptyImages.concat(this.state.flippedImages);
			updateFlippedImages[this._cardIndex(image)] = this._cardName(image);
		this.setState({
			flippedImages: updateFlippedImages,
		})
	},

	_onClick(image) {
		this._gameOverCheck(image);
		if(this.state.gameOver) {
			return;
		} else {
			if(!this.state.flippedValues[this._cardIndex(image)]) {
				this._updateFlippedValues(image);
				this._updateFlippedImages(image);
				this._walleCount(image);
				this._countErrors(image);
			}
		}
	},

	_walleCount(image) {
		var count = 0;
		if(this._cardName(image) === 'k3xkgdci3h9mlnf/walle.jpg?dl=0' ||
		   this._cardName(image) ==='epmgt0g9on02unj/walle2.jpg?dl=0') {
			count += 1
		} 
		this.setState({
			walles: this.state.walles + count,
		});
	},

	_countErrors(image) {
		var count = 0;
		if(this._cardName(image) !== 'k3xkgdci3h9mlnf/walle.jpg?dl=0' && 
		   this._cardName(image) !== 'epmgt0g9on02unj/walle2.jpg?dl=0') {
			count += 1
		} 
		this.setState({
			errors: this.state.errors + count,
		});
	},

	_gameOverCheck(image) {
		if (this.state.walles === 1 || this.state.errors === 3) {
			this._gameOverWin(image);
			this._gameOverLose(image);
		}
	},

	_gameOverWin(image) {
		if (this.state.walles === 1 && 
			this._cardName(image) === 'k3xkgdci3h9mlnf/walle.jpg?dl=0' || 
			this._cardName(image) === 'epmgt0g9on02unj/walle2.jpg?dl=0') {
			this.setState({
				gameOver: true
			})
		}
	},

	_gameOverLose(image) {
		if (this.state.errors === 3 && 
			this._cardName(image) !== 'k3xkgdci3h9mlnf/walle.jpg?dl=0' && 
			this._cardName(image) !== 'epmgt0g9on02unj/walle2.jpg?dl=0') {
			this.setState({
				gameOver: true
			})
		}
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
						<li>{this.state.errors}</li>
						<li><img className='walle-counter' src='https://dl.dropboxusercontent.com/s/k3xkgdci3h9mlnf/walle.jpg?dl=0' /></li>
						<li>{this.state.walles}</li>
						<li><button><i className='fa fa-refresh'></i></button></li>
						{console.log(this.state.gameOver)}
					</ul>
				</div>
				<div className='game-board'>
					<ul clasName='grid'>
						{board}
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