(* Jason Wong
   Writing specifications in Ocaml as I am still learning ReasonReact syntax. *)


type color = G | R | Y | O | B | P

type game_state = {
  moves : int;
  board_state : color list list;
}

(*
    Initialize the board with the number of rows and columns.
*)
val initialize_board : int -> int -> game_state

(*
    Get color of specific square on click
*)
val get_color : int -> int -> game_state -> color

(*
    Handle the click event by progagating chosen color from top left square
*)
val flood_color : color -> game_state

(*
    Increment number of moves by one.
*)
val increment_moves : game_state -> game_state

(*
    Check if board is winning.
*)
val check_win : game_state -> bool
