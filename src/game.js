/** @jsx React.DOM */

'use strict';

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

var StartGame = React.createClass({
	render: function() {
		var styling = this.props.styling(this.props.gameOver);
		return (
			<li className='refresh'><button className='start-button' onClick={this.props.onClick} style={styling}><i className='fa fa-refresh'></i></button></li>
		);
	}
});

var Win = React.createClass({
	render: function() {
		return (
			<div className='win-modal'>
				<p className='win'>YOU WIN!</p>
		  	</div>
		);
	}
});

var GameBoard = React.createClass({
	shuffleImages: function(array) {
		var newArray = [];
		for (var i = 0; i < 6; i += 1) {
			newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
		}
		return newArray;
	},
	boardStyling: function(image, flipped) {
		if (flipped == true) {
			return {
				backgroundSize: 'cover',
				backgroundImage: 'url(src/images/' + image + ')',
			};
		}
	},
	gameOverStyling: function(gameOver) {
		gameOver = this.state.gameOver;
		if (gameOver) {
			return {
				opacity: '1',
				color: '#00ff00',
			};
		}
	},
	infoCreation: function(gameOver) {
		if (this.state !== null) {
			gameOver = this.state.gameOver;
		} else {
			gameOver = false;
		}
		return <StartGame onClick={this.onStartClick} styling={this.gameOverStyling} gameOver={gameOver} />;
	},
	boardCreation: function (images, flipped) {
	    images = images || this.state.imagesArray;
	    flipped = flipped || this.state.flipped;
	    var self = this;
	    return images.map(function (image, i) {
	         return <Card key={i} onClick={self.onCardFlip} image={image} styling={self.boardStyling} image={image} flipped={flipped[i]} cardIndex={i} />;
	    });
	},
	onStartClick: function() {
		var images = this.shuffleImages(['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg']);
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
	onCardFlip: function(cardIndex) {
		if (this.state.gameOver) {
			return ;
		}
		var currentStateFlipped = this.state.flipped;
		currentStateFlipped[cardIndex] = true;
		var currentImagesFlipped = this.state.imagesFlipped;
		currentImagesFlipped[cardIndex] = this.state.imagesArray[cardIndex];
		var walles = currentImagesFlipped.reduce(function(n, value) {
			return value == 'walle.jpg' ? n + 1 : n;
		}, 0);
		var wrongFlips = currentImagesFlipped.reduce(function(n, value) {
			return (value !== undefined && value != 'walle.jpg') ? n + 1 : n;
		}, 0);
		var flips = currentImagesFlipped.reduce(function(n, value) {
			return value !== undefined ? n + 1 : n;
		}, 0);
		var updatedBoard = this.boardCreation(this.state.imagesArray, currentStateFlipped);
		if (walles >= 2) {
			this.setState({
				win: true,
				won: this.won(true),
				gameOver: true,
			})
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
	won: function(win) {
		if (win) {
			return <Win />;
		}
	},
	getInitialState: function() {
	    var images = this.shuffleImages(['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg']);
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
						<li><img className='x-counter' src='src/images/redx.png' /></li>
						<li>{this.state.wrongFlips}</li>
						<li><img className='walle-counter' src='src/images/walle.jpg' /></li>
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
				    <a href='http://www.pixar.com/'> Pixar</a>
				  </p>
				</div>
			  </div>;
	}
});

React.render(<GameBoard />, document.getElementById('container'));
