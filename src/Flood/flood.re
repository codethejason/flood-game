let containerStyle = ReactDOMRe.Style.make(~display="block", ());
let newGameStyle =
  ReactDOMRe.Style.make(
    ~background="#eee",
    ~display="block",
    ~marginBottom="20px",
    ~padding="3px 10px 20px 15px",
    ~borderRadius="3px",
    (),
  );
let infoStyle =
  ReactDOMRe.Style.make(
    ~background=ContainerStyles.reasonReactBlue,
    ~display="block",
    ~borderRadius="3px",
    ~marginTop="20px",
    ~padding="3px 10px 20px 15px",
    (),
  );

type color = Board.color;

type boardSize = int;

type move = {
  x: int,
  y: int,
  c: color,
};

type action =
  | Reset(boardSize)
  | Fill(move);

type state = {
  moves: int,
  finished: bool,
  board: array(array(color)),
};

let initialState = {
  moves: 0,
  finished: false,
  board: [|[|R, Y, P|], [|R, G, Y|], [|G, B, O|]|],
};

let createRandomBoard = (size: int) => {
  // Random.init(int_of_float(Js.Date.now()));
  Array.make_matrix(size, size, Board.G)
  |> Array.map(
       Array.map(_ =>
         switch (Random.int(5)) {
         | 0 => Board.G
         | 1 => Board.R
         | 2 => Board.Y
         | 3 => Board.O
         | 4 => Board.B
         | _ => Board.P
         }
       ),
     );
};

let isFinished = board =>
  if (Array.length(board) == 1) {
    true;
  } else {
    false;
  };

let reducer = (state, action) => {
  switch (action) {
  | Reset(size) =>
    let newBoard = createRandomBoard(size);
    {moves: 0, finished: isFinished(newBoard), board: newBoard};
  | Fill(_) =>
    let newBoard = state.board;
    {
      moves: state.moves + 1,
      finished: isFinished(newBoard),
      board: [|[|G, B|]|],
    };
  };
};

[@react.component]
let make = () => {
  let (state, dispatch) = React.useReducer(reducer, initialState);

  let (boardSize, setBoardSize) = React.useState(() => 1);
  let onChange = (e: ReactEvent.Form.t): unit => {
    let value = e->ReactEvent.Form.target##value;
    setBoardSize(value);
  };
  let onSubmit = (e: ReactEvent.Form.t): unit => {
    ReactEvent.Form.preventDefault(e);
    dispatch(Reset(boardSize));
  };

  <div style=containerStyle>
    <div style=newGameStyle>
      <h3> {React.string("Start New Game")} </h3>
      // {React.string(string_of_int(state.moves))}
      <form onSubmit>
        <input
          type_="number"
          min="1"
          name="size"
          placeholder="Size"
          onChange
        />
        <button type_="submit"> {React.string("Start")} </button>
      </form>
    </div>
    <Board boardState={state.board} />
    <div style=infoStyle>
      <h3> {React.string("Game Status")} </h3>
      <p> {React.string(string_of_int(state.moves) ++ " moves made")} </p>
      <p>
        {switch (state.finished) {
         | false => React.string("Keep going, you're almost there!")
         | true => React.string("Good job, you're done!")
         }}
      </p>
    </div>
  </div>;
};
