
(function () {
  'use strict';

  var Quiz = React.createClass({displayName: "Quiz",
  	render: function () {
  		return React.createElement("div", null, 
  		  this.props.books.map(function(b) {
  		  	return React.createElement(Book, {title: b})
  		  }), ";"
  		);
  	}
  });

  var Book = React.createClass({displayName: "Book",
  	render: function () {
  		return React.createElement("div", null, React.createElement("h4", null, this.props.title))
  	}
  });

  React.render(React.createElement(Quiz, {books: ['The Lord of the Rings', 'The Iliad']}), document.getElementById('game-board'));

})();