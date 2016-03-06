import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';

'use strict';

const styles = {
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

@Radium
export default class NewGameButton extends React.Component {
	constructor(props) {
		super(props);

	}

	_onClickHandler() {
		this.props.onClick()
	}

	render() {
		var styleGameOver
			= this.props.gameOver
			? {color: '#00ff00', opacity: 1}
			: {color: 'gray', opacity: .4}

		return (
			<li style={[styles.newGame, styleGameOver]}><i onClick={this._onClickHandler.bind(this)} className='fa fa-refresh'></i></li>
		);
	}
};
