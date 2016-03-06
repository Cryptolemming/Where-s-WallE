import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import Game from '../Game/index.js';

'use strict';

const CARDS = [
	'k3xkgdci3h9mlnf/walle.jpg?dl=0', 
	'epmgt0g9on02unj/walle2.jpg?dl=0', 
	'1ll4rd0q28y7is8/eve.jpg?dl=0', 
	'7sbiokkeq2hnaze/john.jpg?dl=0', 
	'93ltebnju2vd5ns/captain2.jpg?dl=0', 
	'uho6nbflui260ca/mary.jpg?dl=0',
];

@Radium
class App extends React.Component {
	render() {
		return (
				<Game images={CARDS} />,
		)
	}
};

ReactDOM.render(<App />, document.getElementById('container'));