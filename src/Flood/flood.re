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

let reducer = (state, action) => {
  switch (action) {
  | Reset(_) =>
    Random.init(int_of_float(Js.Date.now()));
    {
      moves: state.moves - 1,
      finished: false,
      board: [|[|R, Y|], [|G, B|]|],
    };
  | Fill(_) => {
      moves: state.moves + 1,
      finished: false,
      board: [|[|G, B|]|],
    }
  };
};

[@react.component]
let make = () => {
  let (state, _dispatch) = React.useReducer(reducer, initialState);

  <div style=containerStyle>
    <div style=newGameStyle>
      <h3> {React.string("Start New Game")} </h3>
      // {React.string(string_of_int(state.moves))}
      <form>
        <input type_="number" min="1" name="size" placeholder="Size" />
        <button type_="submit"> {React.string("Start")} </button>
      </form>
    </div>
    <Board boardState={state.board} />
    <div style=infoStyle>
      <h3> {React.string("Number of Moves Made")} </h3>
      {React.string(string_of_int(state.moves) ++ " moves")}
    </div>
  </div>;
};
