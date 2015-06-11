/** @jsx React.DOM */

'use strict';

var GameBoard = React.createClass({displayName: "GameBoard",
	getInitialState: function() {
		return {blocks: [1, 2, 3, 4, 5, 6]}
		return {flipped: false};
	},
	handleClick: function(event) {
		this.setState({flipped: true});
	},
	render: function() {
		var styleDefault = {
			background: 'blue',
		};
		var styleFlipped = {
			background: 'red',
		};
		var flip = this.state.flipped ? styleFlipped : styleDefault;
		function block(square) {
			return React.createElement("li", {onClick: this.handleClick, className: "game-block", style: flip}, square)
		};
		return (
			React.createElement("ul", null, this.props.blocks.map(block))
		)
	}
});

React.render(React.createElement(Blocks, null), document.getElementById('game-board'));

