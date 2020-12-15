'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var React = require("react");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

var containerStyle = {
  background: "#555",
  display: "flex",
  height: "80vh",
  width: "80vh",
  alignContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "space-around"
};

function colorString(color) {
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

function squareStyle(color, numberSquares) {
  return {
          background: colorString(color),
          display: "flex",
          height: String(Caml_int32.div(100, numberSquares)) + "%",
          width: String(Caml_int32.div(100, numberSquares)) + "%"
        };
}

function Board(Props) {
  var boardState = Props.boardState;
  return React.createElement("div", {
              style: containerStyle
            }, $$Array.mapi((function (i, rowArr) {
                    return $$Array.mapi((function (j, c) {
                                  return React.createElement("div", {
                                              key: String(i) + (", " + String(j)),
                                              style: squareStyle(c, rowArr.length)
                                            });
                                }), rowArr);
                  }), boardState));
}

var make = Board;

exports.containerStyle = containerStyle;
exports.colorString = colorString;
exports.squareStyle = squareStyle;
exports.make = make;
/* react Not a pure module */
