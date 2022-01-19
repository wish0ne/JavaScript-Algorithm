let input = require("fs").readFileSync("../test.txt").toString().split("\n");
const [n, m] = input[0].split(" ").map(Number);

let minMax = 0;
for (let i = 0; i < n; i++) {
  const intArr = input[i + 1].split(" ").map((e) => parseInt(e));
  const minArr = Math.min(...intArr);
  if (minMax < minArr) {
    minMax = minArr;
  }
}

console.log(minMax);
