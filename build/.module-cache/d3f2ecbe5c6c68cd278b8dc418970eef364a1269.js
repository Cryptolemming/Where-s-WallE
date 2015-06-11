/** @jsx React.DOM */
(function () {
	'use strict';

	var React = require('react');
	
	React.render(
	  React.createElement("p", null, "Hello world"),
	  document.getElementById('game-info')
	);

})();