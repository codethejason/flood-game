open Jest;
open Expect;

describe("Board functionality helper functions", () => {
  test("get empty board", () => {
    expect(Board.getEmptyBoard()) |> toHaveLength(0)
  });

  test("get correct corner color", () => {
    let exampleBoard: Board.board = Board.([|[|G, O|], [|P, B|]|]);
    expect(Board.getColor00(exampleBoard)) |> toEqual(Board.G);
  });

  test("valid color to css color", () => {
    expect(Board.colorToCSSColor(G)) |> toMatch("green")
  });

  test("isFinished returns false on unfinished board", () => {
    let unfinishedBoard: Board.board = Board.([|[|G, O|], [|P, B|]|]);
    expect(Board.isFinished(unfinishedBoard)) |> toEqual(false);
  });

  test("isFinished returns true on finished board", () => {
    let finishedBoard: Board.board = Board.([|[|G, G|], [|G, G|]|]);
    expect(Board.isFinished(finishedBoard)) |> toEqual(true);
  });

  test("create random board returns correct dimensions", () => {
    let exampleBoard: Board.board = Board.createRandomBoard(3);
    let boardShape = (Array.length(exampleBoard), Array.length(exampleBoard[0]));
    expect(boardShape) |> toEqual((3, 3));
  });

  test("neighbors length", () => {
    let neighborsLength = List.length(Board.neighbors(1, 0, 10));
    expect(neighborsLength) |> toEqual(3);
  });

  test("neighbors exclude out of bounds", () => {
    let validNeighbors = Board.neighbors(1, 0, 10);
    expect(Array.of_list(validNeighbors)) |> not_ |> toContain((1, (-1)));
  });

  test("fill board with color", () => {
    let exampleBoard: Board.board = Board.([|[|P, G, O|], [|P, B, G|], [|B, B, B|]|]);
    Board.fill(0, 0, Board.P, Board.G, exampleBoard);
    let expectedBoard: Board.board = Board.([|[|G, G, O|], [|G, B, G|], [|B, B, B|]|]);
    expect(exampleBoard) |> toEqual(expectedBoard);
  });

  test("fill should throw out of bounds", () => {
    let exampleBoard: Board.board = Board.([|[|P, G, O|], [|P, B, G|], [|B, B, B|]|]);
    expect(() => {Board.fill(-1, 0, Board.G, Board.P, exampleBoard)}) |> toThrow;
  });

  test("fill should return same result if same target color", () => {
    let exampleBoard: Board.board = Board.([|[|P, G, O|], [|P, B, G|], [|B, B, B|]|]);
    Board.fill(0, 0, Board.P, Board.P, exampleBoard);
    let expectedBoard: Board.board = Board.([|[|P, G, O|], [|P, B, G|], [|B, B, B|]|]);
    expect(exampleBoard) |> toEqual(expectedBoard);
  });
});
