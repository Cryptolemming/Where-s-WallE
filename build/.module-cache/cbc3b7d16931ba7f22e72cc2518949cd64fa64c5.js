/** @jsx React.DOM */

'use strict';

var GameBoard = React.createClass({displayName: "GameBoard",
	getInitialState: function() {
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
		function line(block) {
			return React.createElement("li", {onClick: this.handleClick, className: "game-block", style: flip});
		};
		return React.createElement("ul", null, this.props.lines.map(line));
	}
});

React.render(React.createElement(Blocks, null), document.getElementById('game-board'));