'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Random = require("bs-platform/lib/js/random.js");
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

var initialState_board = [
  [
    /* R */1,
    /* Y */2,
    /* P */5
  ],
  [
    /* R */1,
    /* G */0,
    /* Y */2
  ],
  [
    /* G */0,
    /* B */4,
    /* O */3
  ]
];

var initialState = {
  moves: 0,
  finished: false,
  board: initialState_board
};

function createRandomBoard(size) {
  return $$Array.map((function (param) {
                return $$Array.map((function (param) {
                              var match = Random.$$int(5);
                              if (match > 4 || match < 0) {
                                return /* P */5;
                              } else {
                                return match;
                              }
                            }), param);
              }), $$Array.make_matrix(size, size, /* G */0));
}

function isFinished(board) {
  return board.length === 1;
}

function reducer(state, action) {
  if (action.TAG) {
    var newBoard = state.board;
    return {
            moves: state.moves + 1 | 0,
            finished: newBoard.length === 1,
            board: [[
                /* G */0,
                /* B */4
              ]]
          };
  }
  var newBoard$1 = createRandomBoard(action._0);
  return {
          moves: 0,
          finished: newBoard$1.length === 1,
          board: newBoard$1
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
                }, React.createElement("h3", undefined, "Start New Game"), React.createElement("form", {
                      onSubmit: onSubmit
                    }, React.createElement("input", {
                          min: "1",
                          name: "size",
                          placeholder: "Size",
                          type: "number",
                          onChange: onChange
                        }), React.createElement("button", {
                          type: "submit"
                        }, "Start"))), React.createElement(Board$Flood.make, {
                  boardState: state.board
                }), React.createElement("div", {
                  style: infoStyle
                }, React.createElement("h3", undefined, "Game Status"), React.createElement("p", undefined, String(state.moves) + " moves made"), React.createElement("p", undefined, state.finished ? "Good job, you're done!" : "Keep going, you're almost there!")));
}

var make = Flood;

exports.containerStyle = containerStyle;
exports.newGameStyle = newGameStyle;
exports.infoStyle = infoStyle;
exports.initialState = initialState;
exports.createRandomBoard = createRandomBoard;
exports.isFinished = isFinished;
exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
