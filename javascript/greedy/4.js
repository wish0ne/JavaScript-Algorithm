let input = require("fs").readFileSync("../test.txt").toString().split("\n");
let [n, k] = input[0].split(" ").map(Number);

let count = 0;

while (n !== 1) {
  if (n % k === 0) {
    n = n / k;
  } else {
    n -= 1;
  }
  count += 1;
}
console.log(count);
