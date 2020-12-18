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

type size = int;

type action =
  | Reset(size)
  | Fill(color);

type state = {
  moves: int,
  finished: bool,
  board: Board.board,
};

let initialState = {moves: 0, finished: true, board: Board.getEmptyBoard()};

let reducer = (state, action) => {
  switch (action) {
  | Reset(size) =>
    let newBoard = Board.createRandomBoard(size);
    {moves: 0, finished: Board.isFinished(newBoard), board: newBoard};
  | Fill(color) =>
    let color00 = Board.getColor00(state.board);
    Board.fill(0, 0, color00, color, state.board);
    {
      moves: color00 == color ? state.moves : state.moves + 1,
      finished: Board.isFinished(state.board),
      board: state.board,
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
      <h2> {React.string("Start New Game")} </h2>
      <form onSubmit>
        <input
          type_="number"
          min="1"
          max="100"
          name="size"
          placeholder="Board Size"
          onChange
        />
        <button type_="submit"> {React.string("Start")} </button>
      </form>
    </div>
    <Board
      boardState={state.board}
      makeMove={(c: color, _e) => dispatch(Fill(c))}
    />
    <div style=infoStyle>
      <h2> {React.string("Game Status")} </h2>
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
