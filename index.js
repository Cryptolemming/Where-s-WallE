'use strict';

// individual cards

var Card = React.createClass({
	onClickHandler: function(evt) {
		return this.props.onClick(this.props.cardIndex)
	},
	render: function() {
		var styling = this.props.styling(this.props.image, this.props.flipped);
		return (
			<li className='game-card' onClick={this.onClickHandler} style={styling}></li>
		);
	}
});

// refresh button

var StartGame = React.createClass({
	render: function() {
		var styling = this.props.styling(this.props.gameOver);
		return (
			<li className='refresh'><button className='start-button' onClick={this.props.onClick} style={styling}><i className='fa fa-refresh'></i></button></li>
		);
	}
});

// you win modal

var Win = React.createClass({
	render: function() {
		return (
			<div className='win-modal'>
				<p className='win'>YOU WIN!</p>
		  	</div>
		);
	}
});

// parent component - game

var Game = React.createClass({

	// shuffle the card images

	shuffleImages: function(array) {
		var newArray = [];
		for (var i = 0; i < 6; i += 1) {
			newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
		}
		return newArray;
	},

	// styling to display the card image when flipped

	boardStyling: function(image, flipped) {
		if (flipped == true) {
			return {
				backgroundSize: 'cover',
				backgroundImage: 'url(https://dl.dropboxusercontent.com/s/' + image + ')',
			};
		}
	},

	// styling to change color of refresh button when game is over

	gameOverStyling: function(gameOver) {
		gameOver = this.state.gameOver;
		if (gameOver) {
			return {
				opacity: '1',
				color: '#00ff00',
			};
		}
	},

	// calling the refresh button component on game over

	infoCreation: function(gameOver) {
		if (this.state !== null) {
			gameOver = this.state.gameOver;
		} else {
			gameOver = false;
		}
		return <StartGame onClick={this.onStartClick} styling={this.gameOverStyling} gameOver={gameOver} />;
	},

	// calling the card component and passing it the shuffled images to create the game board

	boardCreation: function (images, flipped) {
	    images = images || this.state.imagesArray;
	    flipped = flipped || this.state.flipped;
	    var self = this;
	    return images.map(function (image, i) {
	         return <Card key={i} onClick={self.onCardFlip} image={image} styling={self.boardStyling} image={image} flipped={flipped[i]} cardIndex={i} />;
	    });
	},

	// changing state when refresh button clicked

	onStartClick: function() {
		var images = this.shuffleImages(['k3xkgdci3h9mlnf/walle.jpg?dl=0', 'k3xkgdci3h9mlnf/walle.jpg?dl=0', '1ll4rd0q28y7is8/eve.jpg?dl=0', '7sbiokkeq2hnaze/john.jpg?dl=0', '93ltebnju2vd5ns/captain2.jpg?dl=0', 'uho6nbflui260ca/mary.jpg?dl=0']);
	    var flipped = [false, false, false, false, false, false];
	    var gameOver = false;
	    var win = false;
	    this.setState ({
	        imagesArray: images,
	        flipped: flipped,
	        imagesFlipped: [],
	        walleCount: 0,
	        flipCount: 0,
			wrongFlips: 4,
			gameOver: gameOver,
			win: win,
			won: this.won(win),
	        gameInfo: this.infoCreation(gameOver),
	        board: this.boardCreation(images, flipped, win),
	    });
	},

	// changing state and declaring behavior on different game over scenarios when a card is flipped

	onCardFlip: function(cardIndex) {

		// if game is over do not allow more card flipping

		if (this.state.gameOver) {
			return ;
		}

		// temporary values to work with state

		var currentStateFlipped = this.state.flipped;
		currentStateFlipped[cardIndex] = true;
		var currentImagesFlipped = this.state.imagesFlipped;
		currentImagesFlipped[cardIndex] = this.state.imagesArray[cardIndex];

		// counting flips for walles, not walles, and general

		var walles = currentImagesFlipped.reduce(function(n, value) {
			return value == 'k3xkgdci3h9mlnf/walle.jpg?dl=0' ? n + 1 : n;
		}, 0);
		var wrongFlips = currentImagesFlipped.reduce(function(n, value) {
			return (value !== undefined && value != 'k3xkgdci3h9mlnf/walle.jpg?dl=0') ? n + 1 : n;
		}, 0);
		var flips = currentImagesFlipped.reduce(function(n, value) {
			return value !== undefined ? n + 1 : n;
		}, 0);
		var updatedBoard = this.boardCreation(this.state.imagesArray, currentStateFlipped);

		// win scenario - 2 walles flipped

		if (walles >= 2) {
			this.setState({
				win: true,
				won: this.won(true),
				gameOver: true,
			})

		// other game over scenarios

		} else if ((walles == 1 && flips == 5) || (walles == 0 && flips == 4)) {
			this.setState ({
				gameOver: true,
			})
		}
		this.setState({
			flipped: currentStateFlipped,
			imagesFlipped: currentImagesFlipped,
			flipCount: flips,
			walleCount: walles,
			wrongFlips: 4 - wrongFlips,
			board: updatedBoard,
		})
	},

	// calling win component to render modal

	won: function(win) {
		if (win) {
			return <Win />;
		}
	},

	getInitialState: function() {
	    var images = this.shuffleImages(['k3xkgdci3h9mlnf/walle.jpg?dl=0', 'k3xkgdci3h9mlnf/walle.jpg?dl=0', '1ll4rd0q28y7is8/eve.jpg?dl=0', '7sbiokkeq2hnaze/john.jpg?dl=0', '93ltebnju2vd5ns/captain2.jpg?dl=0', 'uho6nbflui260ca/mary.jpg?dl=0']);
	    var flipped = [false, false, false, false, false, false];
	    var gameOver = false;
	    var win = false;
	    return {
	        imagesArray: images,
	        flipped: flipped,
	        imagesFlipped: [],
	        walleCount: 0,
	        flipCount: 0,
	        wrongFlips: 4,
	        gameOver: gameOver,
	        win: win,
	        won: this.won(win),
	        gameInfo: this.infoCreation(gameOver),
	        board: this.boardCreation(images, flipped),
	    };
	},

	render: function() {
		return <div className='game-container'>
				<div className='game-info'>
					<ul className='game-counters'>
						<li className='x-counter'>X</li>
						<li>{this.state.wrongFlips}</li>
						<li><img className='walle-counter' src='https://dl.dropboxusercontent.com/s/k3xkgdci3h9mlnf/walle.jpg?dl=0' /></li>
						<li>{this.state.walleCount}/2</li>
						{this.state.gameInfo}
				</ul>
				</div>
				<div className='game-board'>
					{this.state.won}
				  	<ul className='grid'>{this.state.board}</ul>
				</div>
				<div className='info'>
				  <a href='http://aliayoub.com'>
				    <p className='about' target='_blank'>created by Ali Ayoub</p>
				  </a>
				  <p className='copyright'>All artwork and the name Wall-E are property of 
				    <a href='http://www.pixar.com/' className='pixar'> Pixar</a>
				  </p>
				</div>
			  </div>;
	}
});

React.render(<Game />, document.getElementById('container'));
