let input = require("fs").readFileSync("../test.txt").toString().split("\n");
const [n, m, k] = input[0].split(" ").map((e) => parseInt(e));
const arr = input[1].split(" ").map((e) => parseInt(e));

arr.sort((a, b) => a - b);
const max = arr[arr.length - 1];
const max2 = arr[arr.length - 2];

let sum = 0;
sum += (max * k + max2) * parseInt(m / (k + 1));
sum += (m % (k + 1)) * max;
console.log(sum);
