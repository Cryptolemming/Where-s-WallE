var Title = React.createClass({displayName: "Title",
	render: function() {
		return React.createElement("h1", {className: "title"}, "Where\\\\s WallE");
	}
});

React.render(React.createElement(Title, null), document.body);