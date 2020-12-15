'use strict';

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

function reducer(state, action) {
  if (action.TAG) {
    return {
            moves: state.moves + 1 | 0,
            finished: false,
            board: [[
                /* G */0,
                /* B */4
              ]]
          };
  }
  Random.init(Date.now() | 0);
  return {
          moves: state.moves - 1 | 0,
          finished: false,
          board: [
            [
              /* R */1,
              /* Y */2
            ],
            [
              /* G */0,
              /* B */4
            ]
          ]
        };
}

function Flood(Props) {
  var match = React.useReducer(reducer, initialState);
  var state = match[0];
  return React.createElement("div", {
              style: containerStyle
            }, React.createElement("div", {
                  style: newGameStyle
                }, React.createElement("h3", undefined, "Start New Game"), React.createElement("form", undefined, React.createElement("input", {
                          min: "1",
                          name: "size",
                          placeholder: "Size",
                          type: "number"
                        }), React.createElement("button", {
                          type: "submit"
                        }, "Start"))), React.createElement(Board$Flood.make, {
                  boardState: state.board
                }), React.createElement("div", {
                  style: infoStyle
                }, React.createElement("h3", undefined, "Number of Moves Made"), String(state.moves) + " moves"));
}

var make = Flood;

exports.containerStyle = containerStyle;
exports.newGameStyle = newGameStyle;
exports.infoStyle = infoStyle;
exports.initialState = initialState;
exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
