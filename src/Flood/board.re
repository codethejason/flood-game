type color =
  | G
  | R
  | Y
  | O
  | B
  | P;

type board = array(array(color));
let getEmptyBoard = (): board => [||];
let getColor00 = (board): color => board[0][0];

let colorToCSSColor = color =>
  switch (color) {
  | G => "green"
  | R => "red"
  | Y => "yellow"
  | O => "orange"
  | B => "blue"
  | P => "purple"
  };

let containerStyle =
  ReactDOMRe.Style.make(
    ~background="#555",
    ~display="flex",
    ~alignItems="center",
    ~width="50vh",
    ~height="50vh",
    ~flexWrap="wrap",
    ~justifyContent="space-around",
    ~alignContent="space-around",
    ~border="5px solid #555",
    ~borderRadius="3px",
    (),
  );

let squareStyle = (color, numberSquares) =>
  ReactDOMRe.Style.make(
    ~background=colorToCSSColor(color),
    ~display="flex",
    ~width=Js.Float.toString(100. /. float_of_int(numberSquares)) ++ "%",
    ~height=Js.Float.toString(100. /. float_of_int(numberSquares)) ++ "%",
    ~cursor="pointer",
    ~border="1px solid #555",
    ~boxSizing="border-box",
    (),
  );

let createRandomBoard = (size: int) => {
  // Random.init(int_of_float(Js.Date.now()));
  Array.make_matrix(size, size, G)
  |> Array.map(
       Array.map(_ =>
         switch (Random.int(5)) {
         | 0 => G
         | 1 => R
         | 2 => Y
         | 3 => O
         | 4 => B
         | _ => P
         }
       ),
     );
};

let isFinished = board => {
  let color00 = getColor00(board);
  Array.fold_left(
    (acc1, a) =>
      Array.fold_left(
        (acc2, sq) => sq == color00 ? acc2 + 1 : acc2,
        acc1,
        a,
      ),
    0,
    board,
  )
  == Array.length(board)
  * Array.length(board); // Easier to do this than float conversion **
};

let neighbors = (x, y, lenBoard) => {
  let filter_helper = ((x', y')) =>
    x' >= 0 && x' < lenBoard && y' >= 0 && y' < lenBoard;
  let possible = [(x - 1, y), (x, y - 1), (x + 1, y), (x, y + 1)];
  List.filter(filter_helper, possible);
};

let rec fill = (x, y, matchColor, newColor, board) => {
  let rec_helper = (_, (x', y')) =>
    fill(x', y', matchColor, newColor, board);
  if (board[x][y] != newColor && board[x][y] == matchColor) {
    board[x][y] = newColor;
    let valid_neighbors = neighbors(x, y, Array.length(board));
    List.fold_left(rec_helper, (), valid_neighbors);
  };
};

[@react.component]
let make = (~boardState, ~makeMove) => {
  <div style=containerStyle>
    {boardState
     |> Array.mapi((i, rowArr) => {
          rowArr
          |> Array.mapi((j, c) => {
               <div
                 style={squareStyle(c, Array.length(rowArr))}
                 key={string_of_int(i) ++ ", " ++ string_of_int(j)}
                 onClick={makeMove(boardState[i][j])}
               />
             })
          |> React.array
        })
     |> React.array}
  </div>;
};
