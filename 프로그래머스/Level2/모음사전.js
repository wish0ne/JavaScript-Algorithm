function Permutation(arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((v) => [v]);

  const smallerPermutations = Permutation(arr, selectNumber - 1);
  arr.forEach((a) => {
    smallerPermutations.forEach((smaller) => {
      results.push([a].concat(smaller));
    });
  });

  return results;
}
function solution(word) {
  const words = [];
  const alphabet = ["A", "E", "I", "O", "U"];

  words.push(...alphabet);
  Permutation(alphabet, 2).forEach((comb) => {
    words.push(comb.join(""));
  });
  Permutation(alphabet, 3).forEach((comb) => {
    words.push(comb.join(""));
  });
  Permutation(alphabet, 4).forEach((comb) => {
    words.push(comb.join(""));
  });
  Permutation(alphabet, 5).forEach((comb) => {
    words.push(comb.join(""));
  });

  words.sort((a, b) => {
    if (a.length > b.length) {
      for (let i = 0; i < b.length; i++) {
        if (a[i] < b[i]) return -1;
        else if (a[i] > b[i]) return 1;
      }
      return 1;
    } else {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return a[i] - b[i];
      }
      return 1;
    }
  });

  return words.findIndex((w) => w === word) + 1;
}

//solve
//순열이용해서 완전탐색
