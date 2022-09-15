import KMP from "../KMP";

describe("KMP", () => {
  it("should find word position in given text", () => {
    expect(KMP("", "")).toBe(0);
    expect(KMP("a", "")).toBe(0);
    expect(KMP("a", "a")).toBe(0);
    expect(KMP("abcbcglx", "abca")).toBe(-1);
    expect(KMP("abcbcglx", "bcgl")).toBe(3);
    expect(KMP("abcxabcdabxabcdabcdabcy", "abcdabcy")).toBe(15);
    expect(KMP("abcxabcdabxabcdabcdabcy", "abcdabca")).toBe(-1);
    expect(KMP("abcxabcdabxaabcdabcabcdabcdabcy", "abcdabca")).toBe(12);
    expect(KMP("abcxabcdabxaabaabaaaabcdabcdabcy", "aabaabaaa")).toBe(11);
  });
});
