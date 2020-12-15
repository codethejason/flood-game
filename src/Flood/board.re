let containerStyle =
  ReactDOMRe.Style.make(
    ~background="#555",
    ~display="flex",
    ~alignItems="center",
    ~width="80vh",
    ~height="80vh",
    ~flexWrap="wrap",
    ~justifyContent="space-around",
    ~alignContent="space-around",
    ~border="5px solid #555",
    (),
  );

type color =
  | G
  | R
  | Y
  | O
  | B
  | P;

let colorString(color) = switch(color) {
  | G => "green"
  | R => "red"
  | Y => "yellow"
  | O => "orange"
  | B => "blue"
  | P => "purple"
}
let squareStyle(color, numberSquares) =
  ReactDOMRe.Style.make(
    ~background=colorString(color),
    ~display="flex",
    ~width=string_of_int(100 / numberSquares) ++ "%",
    ~height=string_of_int(100 / numberSquares) ++ "%",
    ~cursor="pointer",
    (),
  );

[@react.component]
let make = (~boardState) => {
  <div style=containerStyle>
    {boardState
     |> Array.mapi((i, rowArr) => {
          rowArr
          |> Array.mapi((j, c) => {
               <div
                 style=squareStyle(c, Array.length(rowArr))
                 key={string_of_int(i) ++ ", " ++ string_of_int(j)}>
               </div>
             })
          |> React.array
        })
     |> React.array}
  </div>;
};
