function Permutation(arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = Permutation(rest, selectNumber - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    results.push(...attached);
  });

  return results;
}

const example = [1, 2];
const result = Permutation(example, 2);
for (let i of result) console.log(i);
