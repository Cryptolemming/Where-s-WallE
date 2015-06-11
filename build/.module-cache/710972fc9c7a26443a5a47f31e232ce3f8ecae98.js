var Board = React.createClass({displayName: "Board",
  render: function() {
    return (
      React.createElement("div", {className: "game-block"}
      )
    );
  }
});

var BoardSwitcher = React.createClass({displayName: "BoardSwitcher",
  getInitialState: function() {
    // Start off by selecting the first board
    return {
      selectedIndex: 0
    }
  },

  onToggleClick: function(evt) {
    // Here's the meat of the problem. Notice how we can use this.props here (and anywhere else in the component).
    // When this is called, React updates the state and updates the UI to reflect the new render output.
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.numBoards
    })
  },

  render: function() {
    var boards = [];
    for (var ii = 0; ii < this.props.numBoards; ii++) {
      // We can compare to state here so we're no longer always selecting the first board.
      var isSelected = ii === this.state.selectedIndex;
      boards.push(
        React.createElement(Board, {index: ii, selected: isSelected, key: ii})
      );
    }
    
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "block-board"}, boards), 
        React.createElement("button", {onClick: this.onToggleClick}, "Toggle")
      )
    );
  }
});

React.render(
  React.createElement(BoardSwitcher, {numBoards: 3}),
  document.getElementById('game-board')
);