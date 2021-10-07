import RangeList from "../src/index";
import { assert } from "chai";

describe("Test RangeList", () => {
  const rl = new RangeList();

  describe("Adding ", () => {
    var testCase = [
      { args: [1, 5], expected: [[1, 5]] },
      {
        args: [10, 20],
        expected: [
          [1, 5],
          [10, 20],
        ],
      },
      {
        args: [20, 20],
        expected: [
          [1, 5],
          [10, 20],
        ],
      },
      {
        args: [20, 21],
        expected: [
          [1, 5],
          [10, 21],
        ],
      },
      {
        args: [2, 4],
        expected: [
          [1, 5],
          [10, 21],
        ],
      },
      {
        args: [3, 8],
        expected: [
          [1, 8],
          [10, 21],
        ],
      },
    ];

    testCase.forEach((test) => {
      it("add new Range: " + test.args, () => {
        rl.add(test.args);
        assert.deepEqual(rl.list, test.expected);
      });
    });
  });

  describe("Removing ", () => {
    var testCase = [
      {
        args: [10, 10],
        expected: [
          [1, 8],
          [10, 21],
        ],
      },
      {
        args: [10, 11],
        expected: [
          [1, 8],
          [11, 21],
        ],
      },
      {
        args: [15, 17],
        expected: [
          [1, 8],
          [11, 15],
          [17, 21],
        ],
      },
      {
        args: [3, 19],
        expected: [
          [1, 3],
          [19, 21],
        ],
      },
    ];

    testCase.forEach((test) => {
      it("remove Range: " + test.args, () => {
        rl.remove(test.args);
        assert.deepEqual(rl.list, test.expected);
      });
    });
  });
});
