type color =
  | G
  | R
  | Y
  | O
  | B
  | P;

type board = array(array(color));

let getEmptyBoard: unit => board;

let getColor00: board => color;

let colorToCSSColor: color => string;

let createRandomBoard: int => board;

let isFinished: board => bool;

let neighbors: (int, int, int) => list((int, int));

let fill: (int, int, color, color, board) => unit;

[@react.component]
let make:
  (~boardState: board, ~makeMove: (color, ReactEvent.Mouse.t) => unit) =>
  React.element;