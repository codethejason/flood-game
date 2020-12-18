'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Board$Flood = require("./board.bs.js");
var ContainerStyles$Flood = require("../ContainerStyles.bs.js");

var containerStyle = {
  display: "block"
};

var newGameStyle = {
  background: "#eee",
  display: "block",
  marginBottom: "20px",
  padding: "3px 10px 20px 15px",
  borderRadius: "3px"
};

var infoStyle = {
  background: ContainerStyles$Flood.reasonReactBlue,
  display: "block",
  marginTop: "20px",
  padding: "3px 10px 20px 15px",
  borderRadius: "3px"
};

var initialState_board = Board$Flood.getEmptyBoard(undefined);

var initialState = {
  moves: 0,
  finished: true,
  board: initialState_board
};

function reducer(state, action) {
  if (action.TAG) {
    var color = action._0;
    var color00 = Board$Flood.getColor00(state.board);
    Board$Flood.fill(0, 0, color00, color, state.board);
    return {
            moves: color00 === color ? state.moves : state.moves + 1 | 0,
            finished: Board$Flood.isFinished(state.board),
            board: state.board
          };
  }
  var newBoard = Board$Flood.createRandomBoard(action._0);
  return {
          moves: 0,
          finished: Board$Flood.isFinished(newBoard),
          board: newBoard
        };
}

function Flood(Props) {
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  var match$1 = React.useState(function () {
        return 1;
      });
  var setBoardSize = match$1[1];
  var boardSize = match$1[0];
  var onChange = function (e) {
    return Curry._1(setBoardSize, e.target.value);
  };
  var onSubmit = function (e) {
    e.preventDefault();
    return Curry._1(dispatch, {
                TAG: /* Reset */0,
                _0: boardSize
              });
  };
  return React.createElement("div", {
              style: containerStyle
            }, React.createElement("div", {
                  style: newGameStyle
                }, React.createElement("h2", undefined, "Start New Game"), React.createElement("form", {
                      onSubmit: onSubmit
                    }, React.createElement("input", {
                          max: "100",
                          min: "1",
                          name: "size",
                          placeholder: "Board Size",
                          type: "number",
                          onChange: onChange
                        }), React.createElement("button", {
                          type: "submit"
                        }, "Start"))), React.createElement(Board$Flood.make, {
                  boardState: state.board,
                  makeMove: (function (c, _e) {
                      return Curry._1(dispatch, {
                                  TAG: /* Fill */1,
                                  _0: c
                                });
                    })
                }), React.createElement("div", {
                  style: infoStyle
                }, React.createElement("h2", undefined, "Game Status"), React.createElement("p", undefined, String(state.moves) + " moves made"), React.createElement("p", undefined, state.finished ? "Good job, you're done!" : "Keep going, you're almost there!")));
}

var make = Flood;

exports.containerStyle = containerStyle;
exports.newGameStyle = newGameStyle;
exports.infoStyle = infoStyle;
exports.initialState = initialState;
exports.reducer = reducer;
exports.make = make;
/* initialState Not a pure module */
