/** @jsx React.DOM */

'use strict';

var Blocks = React.createClass({displayName: "Blocks",
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
		return (
			React.createElement("div", {onClick: this.handleClick, className: "game-block", style: flip})
		)
	}
});

React.render(React.createElement(Blocks, null), document.getElementById('game-board'));
