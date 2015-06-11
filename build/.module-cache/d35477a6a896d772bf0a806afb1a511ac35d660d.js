/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
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

var Blocks = React.createClass({displayName: "Blocks",
	render: function() {
		return (
			React.createElement("div", {idName: "game-board"}, this.props.Block)
		)
	}
})

React.render(React.createElement(Blocks, null), document.getElementById('game-board'));
