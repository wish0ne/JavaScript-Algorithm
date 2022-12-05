import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

let answer = 0;
for (let i = 1; i <= n; i++) {
  let temp =
    i +
    i
      .toString()
      .split("")
      .reduce((acc, curr) => acc + parseInt(curr), 0);
  if (temp === n) {
    answer = i;
    break;
  }
}
console.log(answer);

//solve
//완전탐색 문제
