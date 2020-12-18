'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.bs.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Board$Flood = require("../src/Flood/board.bs.js");

Jest.describe("Board functionality helper functions", (function (param) {
        Jest.test("get empty board", (function (param) {
                return Jest.Expect.toHaveLength(0, Jest.Expect.expect(Board$Flood.getEmptyBoard(undefined)));
              }));
        Jest.test("get correct corner color", (function (param) {
                var exampleBoard = [
                  [
                    /* G */0,
                    /* O */3
                  ],
                  [
                    /* P */5,
                    /* B */4
                  ]
                ];
                return Jest.Expect.toEqual(/* G */0, Jest.Expect.expect(Board$Flood.getColor00(exampleBoard)));
              }));
        Jest.test("valid color to css color", (function (param) {
                return Jest.Expect.toMatch("green", Jest.Expect.expect(Board$Flood.colorToCSSColor(/* G */0)));
              }));
        Jest.test("isFinished returns false on unfinished board", (function (param) {
                var unfinishedBoard = [
                  [
                    /* G */0,
                    /* O */3
                  ],
                  [
                    /* P */5,
                    /* B */4
                  ]
                ];
                return Jest.Expect.toEqual(false, Jest.Expect.expect(Board$Flood.isFinished(unfinishedBoard)));
              }));
        Jest.test("isFinished returns true on finished board", (function (param) {
                var finishedBoard = [
                  [
                    /* G */0,
                    /* G */0
                  ],
                  [
                    /* G */0,
                    /* G */0
                  ]
                ];
                return Jest.Expect.toEqual(true, Jest.Expect.expect(Board$Flood.isFinished(finishedBoard)));
              }));
        Jest.test("create random board returns correct dimensions", (function (param) {
                var exampleBoard = Board$Flood.createRandomBoard(3);
                var boardShape_0 = exampleBoard.length;
                var boardShape_1 = Caml_array.get(exampleBoard, 0).length;
                var boardShape = [
                  boardShape_0,
                  boardShape_1
                ];
                return Jest.Expect.toEqual([
                            3,
                            3
                          ], Jest.Expect.expect(boardShape));
              }));
        Jest.test("create random board throws exception on negative numbers", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expect(function (param) {
                                return Board$Flood.createRandomBoard(-1);
                              }));
              }));
        Jest.test("neighbors length", (function (param) {
                var neighborsLength = List.length(Board$Flood.neighbors(1, 0, 10));
                return Jest.Expect.toEqual(3, Jest.Expect.expect(neighborsLength));
              }));
        Jest.test("neighbors exclude out of bounds", (function (param) {
                var validNeighbors = Board$Flood.neighbors(1, 0, 10);
                return Jest.Expect.toContain([
                            1,
                            -1
                          ], Jest.Expect.not__(Jest.Expect.expect($$Array.of_list(validNeighbors))));
              }));
        Jest.test("fill board with color", (function (param) {
                var exampleBoard = [
                  [
                    /* P */5,
                    /* G */0,
                    /* O */3
                  ],
                  [
                    /* P */5,
                    /* B */4,
                    /* G */0
                  ],
                  [
                    /* B */4,
                    /* B */4,
                    /* B */4
                  ]
                ];
                Board$Flood.fill(0, 0, /* P */5, /* G */0, exampleBoard);
                var expectedBoard = [
                  [
                    /* G */0,
                    /* G */0,
                    /* O */3
                  ],
                  [
                    /* G */0,
                    /* B */4,
                    /* G */0
                  ],
                  [
                    /* B */4,
                    /* B */4,
                    /* B */4
                  ]
                ];
                return Jest.Expect.toEqual(expectedBoard, Jest.Expect.expect(exampleBoard));
              }));
        Jest.test("fill should throw out of bounds", (function (param) {
                var exampleBoard = [
                  [
                    /* P */5,
                    /* G */0,
                    /* O */3
                  ],
                  [
                    /* P */5,
                    /* B */4,
                    /* G */0
                  ],
                  [
                    /* B */4,
                    /* B */4,
                    /* B */4
                  ]
                ];
                return Jest.Expect.toThrow(Jest.Expect.expect(function (param) {
                                return Board$Flood.fill(-1, 0, /* G */0, /* P */5, exampleBoard);
                              }));
              }));
        return Jest.test("fill should return same result if same target color", (function (param) {
                      var exampleBoard = [
                        [
                          /* P */5,
                          /* G */0,
                          /* O */3
                        ],
                        [
                          /* P */5,
                          /* B */4,
                          /* G */0
                        ],
                        [
                          /* B */4,
                          /* B */4,
                          /* B */4
                        ]
                      ];
                      Board$Flood.fill(0, 0, /* P */5, /* P */5, exampleBoard);
                      var expectedBoard = [
                        [
                          /* P */5,
                          /* G */0,
                          /* O */3
                        ],
                        [
                          /* P */5,
                          /* B */4,
                          /* G */0
                        ],
                        [
                          /* B */4,
                          /* B */4,
                          /* B */4
                        ]
                      ];
                      return Jest.Expect.toEqual(expectedBoard, Jest.Expect.expect(exampleBoard));
                    }));
      }));

/*  Not a pure module */
