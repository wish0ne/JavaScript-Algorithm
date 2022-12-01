import Euclidean from "../Euclidean.js";

describe("Euclidean Algorithm", () => {
  it("should calculate GCD recursively", () => {
    expect(Euclidean(0, 0)).toBe(0);
    expect(Euclidean(2, 0)).toBe(2);
    expect(Euclidean(0, 2)).toBe(2);
    expect(Euclidean(1, 2)).toBe(1);
    expect(Euclidean(2, 1)).toBe(1);
    expect(Euclidean(6, 6)).toBe(6);
    expect(Euclidean(2, 4)).toBe(2);
    expect(Euclidean(4, 2)).toBe(2);
    expect(Euclidean(12, 4)).toBe(4);
    expect(Euclidean(4, 12)).toBe(4);
    expect(Euclidean(5, 13)).toBe(1);
    expect(Euclidean(27, 13)).toBe(1);
    expect(Euclidean(24, 60)).toBe(12);
    expect(Euclidean(60, 24)).toBe(12);
    expect(Euclidean(252, 105)).toBe(21);
    expect(Euclidean(105, 252)).toBe(21);
    expect(Euclidean(1071, 462)).toBe(21);
    expect(Euclidean(462, 1071)).toBe(21);
    expect(Euclidean(462, 1071)).toBe(21);
    expect(Euclidean(462, 1071)).toBe(21);
  });
});
