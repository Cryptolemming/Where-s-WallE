import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';

'use strict';

var styles = {
	card: {
		cursor: 'pointer',
		float: 'left',
		borderRadius: '50%',
		width: '21%',
		height: '23%',
		opacity: '.96',
		marginLeft: '4%',
		marginBottom: '4%',
		marginTop: '2%',
	    boxShadow: 'inset 5px 5px 15px #000',
	    border: '1px solid black',
	    ':hover': {
	    	backgroundColor: 'purple',
	    }
	},
};

var Card = Radium(React.createClass({
	// takes in an image, flipped truthiness, and onPress flipped function as props
	propTypes: {
		image: React.PropTypes.string.isRequired,
		flipped: React.PropTypes.bool.isRequired,
		onClick: React.PropTypes.func.isRequired,
	},

	_onClickHandler() {
		this.props.onClick(this.props.image);
	},

	render() {
		var styleFlipped
			= this.props.flipped
			? {backgroundImage: 'url(https://dl.dropboxusercontent.com/s/' + this.props.image + ')',
			   backgroundSize: 'cover'}
			: {backgroundColor: 'gray'};

		return(
			<li
				onClick={this._onClickHandler}
				style={[styles.card, styleFlipped]}>
			</li>
		);
	}
}));
