let input = require("fs").readFileSync("../test.txt").toString().split("\n");
const n = parseInt(input[0]);

let arr = [];
for (let i = 0; i < n; i++) {
  arr.push(parseInt(input[i + 1]));
}
//배열 내림차순 정렬
arr.sort((a, b) => b - a);

let answer = "";
for (let i of arr) {
  answer += i + " ";
}
console.log(answer.trim());
