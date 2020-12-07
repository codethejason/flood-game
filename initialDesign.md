# Project Plan
## Overview
I think it would a good oppoortunity to learn ReasonReact to take advantage of typing and other FP
features to build the Flood app [here](https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/flood.html).
After a user loads the page, the user can click on squares in the game to make moves. The game starts 
out by randomizing a set of colors across a board of a size that the user specifies. Then, the user can click
a color to fill the top left square, and every orthogonally connected path of squares from the top left 
square with the same color as the top left square will be filled with the new color. The goal is to 
complete the puzzle in the fewest number of moves. 

## Libraries
- ReasonReact

## Mock Behavior
The final app would be done in a UI; sample gameplay is shown below, where g = green, b = blue, and r=red.
The final game would have more colors and use a variable-sized grid.

### Start
```
| g | b | b |
| b | r | r |
| r | b | b |
```

### Fill b
```
| b | b | b |
| b | r | r |
| r | b | b |
```

### Fill r
```
| r | r | r |
| r | r | r |
| r | b | b |
```

### Fill b
```
| b | b | b |
| b | b | b |
| b | b | b |
```

Game completed in 3 moves.

## Roadmap
0. View and complete basic tutorials on ReasonReact.
1. Get a basic app running on localhost:8000.
2. Implement basic user interface of website that houses the game board as well as any extra buttons
or text fields to specify game parameters (e.g. size of the game board).
3. Implement initialization logic of game based on game parameters passed into the app, including
setting the colors of all the squares on the board.
4. Implement flood filling logic - when user clicks on square, get the color of the square, fill
the top-leftmost square with that color, and propagate the color to all squares in orthogonal path to 
top-leftmost square with the same color as it.
5. Implement move counter and checking logic to stop the game if the game is over.
6. Additional features can be added on later.