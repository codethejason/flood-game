'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Random = require("bs-platform/lib/js/random.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");

function getEmptyBoard(param) {
  return [];
}

function getColor00(board) {
  return Caml_array.get(Caml_array.get(board, 0), 0);
}

function colorToCSSColor(color) {
  switch (color) {
    case /* G */0 :
        return "green";
    case /* R */1 :
        return "red";
    case /* Y */2 :
        return "yellow";
    case /* O */3 :
        return "orange";
    case /* B */4 :
        return "blue";
    case /* P */5 :
        return "purple";
    
  }
}

var containerStyle = {
  background: "#555",
  border: "5px solid #555",
  display: "flex",
  height: "50vh",
  width: "50vh",
  borderRadius: "3px",
  alignContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "space-around"
};

function squareStyle(color, numberSquares) {
  return {
          background: colorToCSSColor(color),
          border: "1px solid #555",
          cursor: "pointer",
          display: "flex",
          height: (100 / numberSquares).toString() + "%",
          width: (100 / numberSquares).toString() + "%",
          boxSizing: "border-box"
        };
}

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
  var color00 = getColor00(board);
  return $$Array.fold_left((function (acc1, a) {
                return $$Array.fold_left((function (acc2, sq) {
                              if (sq === color00) {
                                return acc2 + 1 | 0;
                              } else {
                                return acc2;
                              }
                            }), acc1, a);
              }), 0, board) === Math.imul(board.length, board.length);
}

function neighbors(x, y, lenBoard) {
  var filter_helper = function (param) {
    var y$prime = param[1];
    var x$prime = param[0];
    if (x$prime >= 0 && x$prime < lenBoard && y$prime >= 0) {
      return y$prime < lenBoard;
    } else {
      return false;
    }
  };
  return List.filter(filter_helper)({
              hd: [
                x - 1 | 0,
                y
              ],
              tl: {
                hd: [
                  x,
                  y - 1 | 0
                ],
                tl: {
                  hd: [
                    x + 1 | 0,
                    y
                  ],
                  tl: {
                    hd: [
                      x,
                      y + 1 | 0
                    ],
                    tl: /* [] */0
                  }
                }
              }
            });
}

function fill(x, y, matchColor, newColor, board) {
  var rec_helper = function (param, param$1) {
    return fill(param$1[0], param$1[1], matchColor, newColor, board);
  };
  if (!(Caml_obj.caml_notequal(Caml_array.get(Caml_array.get(board, x), y), newColor) && Caml_obj.caml_equal(Caml_array.get(Caml_array.get(board, x), y), matchColor))) {
    return ;
  }
  Caml_array.set(Caml_array.get(board, x), y, newColor);
  var valid_neighbors = neighbors(x, y, board.length);
  return List.fold_left(rec_helper, undefined, valid_neighbors);
}

function Board(Props) {
  var boardState = Props.boardState;
  var makeMove = Props.makeMove;
  return React.createElement("div", {
              style: containerStyle
            }, $$Array.mapi((function (i, rowArr) {
                    return $$Array.mapi((function (j, c) {
                                  return React.createElement("div", {
                                              key: String(i) + (", " + String(j)),
                                              style: squareStyle(c, rowArr.length),
                                              onClick: Curry._1(makeMove, Caml_array.get(Caml_array.get(boardState, i), j))
                                            });
                                }), rowArr);
                  }), boardState));
}

var make = Board;

exports.getEmptyBoard = getEmptyBoard;
exports.getColor00 = getColor00;
exports.colorToCSSColor = colorToCSSColor;
exports.createRandomBoard = createRandomBoard;
exports.isFinished = isFinished;
exports.neighbors = neighbors;
exports.fill = fill;
exports.make = make;
/* react Not a pure module */
