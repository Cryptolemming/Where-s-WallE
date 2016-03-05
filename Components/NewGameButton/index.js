import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';

'use strict';

var styles = {
	newGame: {
		background: 'transparent',
		padding: '5px',
		fontStyle: 'bold',
		margin: '-25px 0px 0px 115px',
		border: '0px !important',
		cursor: 'pointer',
		float: 'right',
		fontSize: '1.6em',
		':hover': {
			color: '#00ff00', 
			opacity: 1,
		}
	},
};

var NewGameButton = Radium(React.createClass({
	propTypes: {
		gameOver: React.PropTypes.bool.isRequired,
		onClick: React.PropTypes.func.isRequired,
	},

	_onClickHandler() {
		this.props.OnClick()
		console.log(this);
	},

	render() {
		var styleGameOver
			= this.props.gameOver
			? {color: '#00ff00', opacity: 1}
			: {color: 'gray', opacity: .4}

		return (
			<li><i onClick={this._onClickHandler} style={[styles.newGame, styleGameOver]} className='fa fa-refresh'></i></li>
		);
	}
}));

module.exports = NewGameButton;