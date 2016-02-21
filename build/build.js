/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("'use strict';\n\n// individual cards\n\nvar Card = React.createClass({\n\tdisplayName: 'Card',\n\n\tonClickHandler: function onClickHandler(evt) {\n\t\treturn this.props.onClick(this.props.cardIndex);\n\t},\n\trender: function render() {\n\t\tvar styling = this.props.styling(this.props.image, this.props.flipped);\n\t\treturn React.createElement('li', { className: 'game-card', onClick: this.onClickHandler, style: styling });\n\t}\n});\n\n// refresh button\n\nvar StartGame = React.createClass({\n\tdisplayName: 'StartGame',\n\n\trender: function render() {\n\t\tvar styling = this.props.styling(this.props.gameOver);\n\t\treturn React.createElement('li', { className: 'refresh' }, React.createElement('button', { className: 'start-button', onClick: this.props.onClick, style: styling }, React.createElement('i', { className: 'fa fa-refresh' })));\n\t}\n});\n\n// you win modal\n\nvar Win = React.createClass({\n\tdisplayName: 'Win',\n\n\trender: function render() {\n\t\treturn React.createElement('div', { className: 'win-modal' }, React.createElement('p', { className: 'win' }, 'YOU WIN!'));\n\t}\n});\n\n// parent component - game\n\nvar Game = React.createClass({\n\tdisplayName: 'Game',\n\n\t// shuffle the card images\n\n\tshuffleImages: function shuffleImages(array) {\n\t\tvar newArray = [];\n\t\tfor (var i = 0; i < 6; i += 1) {\n\t\t\tnewArray.push(array.splice(Math.floor(Math.random() * array.length), 1));\n\t\t}\n\t\treturn newArray;\n\t},\n\n\t// styling to display the card image when flipped\n\n\tboardStyling: function boardStyling(image, flipped) {\n\t\tif (flipped == true) {\n\t\t\treturn {\n\t\t\t\tbackgroundSize: 'cover',\n\t\t\t\tbackgroundImage: 'url(https://dl.dropboxusercontent.com/s/' + image + ')'\n\t\t\t};\n\t\t}\n\t},\n\n\t// styling to change color of refresh button when game is over\n\n\tgameOverStyling: function gameOverStyling(gameOver) {\n\t\tgameOver = this.state.gameOver;\n\t\tif (gameOver) {\n\t\t\treturn {\n\t\t\t\topacity: '1',\n\t\t\t\tcolor: '#00ff00'\n\t\t\t};\n\t\t}\n\t},\n\n\t// calling the refresh button component on game over\n\n\tinfoCreation: function infoCreation(gameOver) {\n\t\tif (this.state !== null) {\n\t\t\tgameOver = this.state.gameOver;\n\t\t} else {\n\t\t\tgameOver = false;\n\t\t}\n\t\treturn React.createElement(StartGame, { onClick: this.onStartClick, styling: this.gameOverStyling, gameOver: gameOver });\n\t},\n\n\t// calling the card component and passing it the shuffled images to create the game board\n\n\tboardCreation: function boardCreation(images, flipped) {\n\t\timages = images || this.state.imagesArray;\n\t\tflipped = flipped || this.state.flipped;\n\t\tvar self = this;\n\t\treturn images.map(function (image, i) {\n\t\t\treturn React.createElement(Card, { key: i, onClick: self.onCardFlip, image: image, styling: self.boardStyling, image: image, flipped: flipped[i], cardIndex: i });\n\t\t});\n\t},\n\n\t// changing state when refresh button clicked\n\n\tonStartClick: function onStartClick() {\n\t\tvar images = this.shuffleImages(['k3xkgdci3h9mlnf/walle.jpg?dl=0', 'k3xkgdci3h9mlnf/walle.jpg?dl=0', '1ll4rd0q28y7is8/eve.jpg?dl=0', '7sbiokkeq2hnaze/john.jpg?dl=0', '93ltebnju2vd5ns/captain2.jpg?dl=0', 'uho6nbflui260ca/mary.jpg?dl=0']);\n\t\tvar flipped = [false, false, false, false, false, false];\n\t\tvar gameOver = false;\n\t\tvar win = false;\n\t\tthis.setState({\n\t\t\timagesArray: images,\n\t\t\tflipped: flipped,\n\t\t\timagesFlipped: [],\n\t\t\twalleCount: 0,\n\t\t\tflipCount: 0,\n\t\t\twrongFlips: 4,\n\t\t\tgameOver: gameOver,\n\t\t\twin: win,\n\t\t\twon: this.won(win),\n\t\t\tgameInfo: this.infoCreation(gameOver),\n\t\t\tboard: this.boardCreation(images, flipped, win)\n\t\t});\n\t},\n\n\t// changing state and declaring behavior on different game over scenarios when a card is flipped\n\n\tonCardFlip: function onCardFlip(cardIndex) {\n\n\t\t// if game is over do not allow more card flipping\n\n\t\tif (this.state.gameOver) {\n\t\t\treturn;\n\t\t}\n\n\t\t// temporary values to work with state\n\n\t\tvar currentStateFlipped = this.state.flipped;\n\t\tcurrentStateFlipped[cardIndex] = true;\n\t\tvar currentImagesFlipped = this.state.imagesFlipped;\n\t\tcurrentImagesFlipped[cardIndex] = this.state.imagesArray[cardIndex];\n\n\t\t// counting flips for walles, not walles, and general\n\n\t\tvar walles = currentImagesFlipped.reduce(function (n, value) {\n\t\t\treturn value == 'k3xkgdci3h9mlnf/walle.jpg?dl=0' ? n + 1 : n;\n\t\t}, 0);\n\t\tvar wrongFlips = currentImagesFlipped.reduce(function (n, value) {\n\t\t\treturn value !== undefined && value != 'k3xkgdci3h9mlnf/walle.jpg?dl=0' ? n + 1 : n;\n\t\t}, 0);\n\t\tvar flips = currentImagesFlipped.reduce(function (n, value) {\n\t\t\treturn value !== undefined ? n + 1 : n;\n\t\t}, 0);\n\t\tvar updatedBoard = this.boardCreation(this.state.imagesArray, currentStateFlipped);\n\n\t\t// win scenario - 2 walles flipped\n\n\t\tif (walles >= 2) {\n\t\t\tthis.setState({\n\t\t\t\twin: true,\n\t\t\t\twon: this.won(true),\n\t\t\t\tgameOver: true\n\t\t\t});\n\n\t\t\t// other game over scenarios\n\t\t} else if (walles == 1 && flips == 5 || walles == 0 && flips == 4) {\n\t\t\t\tthis.setState({\n\t\t\t\t\tgameOver: true\n\t\t\t\t});\n\t\t\t}\n\t\tthis.setState({\n\t\t\tflipped: currentStateFlipped,\n\t\t\timagesFlipped: currentImagesFlipped,\n\t\t\tflipCount: flips,\n\t\t\twalleCount: walles,\n\t\t\twrongFlips: 4 - wrongFlips,\n\t\t\tboard: updatedBoard\n\t\t});\n\t},\n\n\t// calling win component to render modal\n\n\twon: function won(win) {\n\t\tif (win) {\n\t\t\treturn React.createElement(Win, null);\n\t\t}\n\t},\n\n\tgetInitialState: function getInitialState() {\n\t\tvar images = this.shuffleImages(['k3xkgdci3h9mlnf/walle.jpg?dl=0', 'k3xkgdci3h9mlnf/walle.jpg?dl=0', '1ll4rd0q28y7is8/eve.jpg?dl=0', '7sbiokkeq2hnaze/john.jpg?dl=0', '93ltebnju2vd5ns/captain2.jpg?dl=0', 'uho6nbflui260ca/mary.jpg?dl=0']);\n\t\tvar flipped = [false, false, false, false, false, false];\n\t\tvar gameOver = false;\n\t\tvar win = false;\n\t\treturn {\n\t\t\timagesArray: images,\n\t\t\tflipped: flipped,\n\t\t\timagesFlipped: [],\n\t\t\twalleCount: 0,\n\t\t\tflipCount: 0,\n\t\t\twrongFlips: 4,\n\t\t\tgameOver: gameOver,\n\t\t\twin: win,\n\t\t\twon: this.won(win),\n\t\t\tgameInfo: this.infoCreation(gameOver),\n\t\t\tboard: this.boardCreation(images, flipped)\n\t\t};\n\t},\n\n\trender: function render() {\n\t\treturn React.createElement('div', { className: 'game-container' }, React.createElement('div', { className: 'game-info' }, React.createElement('ul', { className: 'game-counters' }, React.createElement('li', { className: 'x-counter' }, 'X'), React.createElement('li', null, this.state.wrongFlips), React.createElement('li', null, React.createElement('img', { className: 'walle-counter', src: 'https://dl.dropboxusercontent.com/s/k3xkgdci3h9mlnf/walle.jpg?dl=0' })), React.createElement('li', null, this.state.walleCount, '/2'), this.state.gameInfo)), React.createElement('div', { className: 'game-board' }, this.state.won, React.createElement('ul', { className: 'grid' }, this.state.board)), React.createElement('div', { className: 'info' }, React.createElement('a', { href: 'http://aliayoub.com' }, React.createElement('p', { className: 'about', target: '_blank' }, 'created by Ali Ayoub')), React.createElement('p', { className: 'copyright' }, 'All artwork and the name Wall-E are property of', React.createElement('a', { href: 'http://www.pixar.com/', className: 'pixar' }, ' Pixar'))));\n\t}\n});\n\nReact.render(React.createElement(Game, null), document.getElementById('container'));\n\n/*****************\n ** WEBPACK FOOTER\n ** ./index.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./index.js?");

/***/ }
/******/ ]);