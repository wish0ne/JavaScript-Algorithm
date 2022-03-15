let input = require("fs").readFileSync("../test.txt").toString().split("\n");
const n = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);

d = new Array(n).fill(0);
d[0] = arr[0];
d[1] = Math.max(arr[0], arr[1]);
for (let i = 2; i < n; i++) {
  d[i] = Math.max(d[i - 1], d[i - 2] + arr[i]);
}
console.log(d[n - 1]);
