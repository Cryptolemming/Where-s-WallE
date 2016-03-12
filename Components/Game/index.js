import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import Card from '../Card';
import NewGameButton from '../NewGameButton';
import WinModal from '../WinModal';

'use strict';

const styles = {
	gameContainer: {
		width: 95%;
		height: '650px';
		backgroundImage: 'url(https://dl.dropboxusercontent.com/s/yfg0jkm338hriyq/axiom.png?dl=0)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	gameBoard: {
		marginLeft: '350px';
		paddingLeft: '50px';
		width: 55%;
		height: 55%;
		display: 'inline-block';
	},
	copyright: {
		float: 'right',
		fontSize: '.8em',
		opacity: .4,
		color: 'white',
	},
	pixar: {
		color: '#aa8cc5',
		fontStyle: 'bold',
		':hover': {
			color: 'white',
		}
	}
};

@Radium
export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this._onClick = this._onClick.bind(this);
		this._onClickNewGameButton = this._onClickNewGameButton.bind(this);
		this.state = {
			shuffledCards: this._startingImages(),
			flippedValues: [false, false, false, false, false, false],
			flippedImages: [],
			walles: 0,
			errors: 0,
			gameOver: false,
			won: false,
		};
	}

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
	}

	_startingImages() {
		return this._shuffleImages(this.props.images);
	}

	_cardIndex(image) {
		return this.state.shuffledCards.indexOf(image);
	}

	_cardName(image) {
		return this.state.shuffledCards[this._cardIndex(image)];
	}

	_updateFlippedValues(image) {
		var emptyValues = [];
		var updateFlippedValues = emptyValues.concat(this.state.flippedValues);
			updateFlippedValues[this._cardIndex(image)] = true;
		this.setState({
			flippedValues: updateFlippedValues,
		})
	}

	_updateFlippedImages(image) {
		var emptyImages = [];
		var updateFlippedImages = emptyImages.concat(this.state.flippedImages);
			updateFlippedImages[this._cardIndex(image)] = this._cardName(image);
		this.setState({
			flippedImages: updateFlippedImages,
		})
	}

	_onClick(image) {
		if(this.state.gameOver) {
			return;
		} else {
			if(!this.state.flippedValues[this._cardIndex(image)]) {
				this._gameOverCheck(image);
				this._updateFlippedValues(image);
				this._updateFlippedImages(image);
				this._walleCount(image);
				this._countErrors(image);
			}
		}
	}

	_walleCount(image) {
		var count = 0;
		if(this._cardName(image) === 'k3xkgdci3h9mlnf/walle.jpg?dl=0' ||
		   this._cardName(image) ==='epmgt0g9on02unj/walle2.jpg?dl=0') {
			count += 1
		} 
		this.setState({
			walles: this.state.walles + count,
		});
	}

	_countErrors(image) {
		var count = 0;
		if(this._cardName(image) !== 'k3xkgdci3h9mlnf/walle.jpg?dl=0' && 
		   this._cardName(image) !== 'epmgt0g9on02unj/walle2.jpg?dl=0') {
			count += 1
		} 
		this.setState({
			errors: this.state.errors + count,
		});
	}

	_gameOverCheck(image) {
		if (this.state.walles === 1 || this.state.errors === 3) {
			this._gameOverWin(image);
			this._gameOverLose(image);
		}
	}

	_gameOverWin(image) {
		if (this.state.walles === 1 && 
			this._cardName(image) === 'k3xkgdci3h9mlnf/walle.jpg?dl=0' || 
			this._cardName(image) === 'epmgt0g9on02unj/walle2.jpg?dl=0') {
			this.setState({
				gameOver: true,
				won: true
			});
		}
	}

	_gameOverLose(image) {
		if (this.state.errors === 3 && 
			this._cardName(image) !== 'k3xkgdci3h9mlnf/walle.jpg?dl=0' && 
			this._cardName(image) !== 'epmgt0g9on02unj/walle2.jpg?dl=0') {
			this.setState({
				gameOver: true
			});
		}
	}

	_onClickNewGameButton() {
		this.setState({
			shuffledCards: this._startingImages(),
			flippedValues: [false, false, false, false, false, false],
			flippedImages: [],
			walles: 0,
			errors: 0,
			gameOver: false,
			won: false,
		});
	}

	render() {
		var board = this.state.shuffledCards.map((card, index) => {
			return <Card image={card} key={card} onClick={this._onClick} flipped={this.state.flippedValues[index]} />
		});

		return(
			<div style={styles.gameContainer}>
				<div className='game-info'>
					<ul className='game-counters'>
						<li className='x-counter'>X</li>
						<li>{this.state.errors}</li>
						<li><img className='walle-counter' src='https://dl.dropboxusercontent.com/s/k3xkgdci3h9mlnf/walle.jpg?dl=0' /></li>
						<li>{this.state.walles}</li>
						<NewGameButton gameOver={this.state.gameOver} onClick={this._onClickNewGameButton} />
						{console.log(this.state.gameOver)}
					</ul>
				</div>
				<div className='game-board'>
					<ul className='grid'>
						{board}
						<WinModal won={this.state.won} />
					</ul>
				</div>
				<div className='info'>
					<a href='http://www.amoderndev.com'>
						<p className='about' target='_blank'>created by Ali Ayoub</p>
					</a>
					<p style={styles.copyright}>All artwork and the name Wall-E are property of 
						<a href='http://www.pixar.com/' style={styles.pixar}> Pixar</a>
					</p>
				</div>
			</div>
		);
	}
};