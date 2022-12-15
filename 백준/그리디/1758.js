import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const tips = [];
for (let i = 1; i <= n; i++) tips.push(parseInt(input[i]));

tips.sort((a, b) => b - a);
let answer = 0;
for (let i = 0; i < n; i++) {
  let tip = tips[i] - i;
  if (tip < 0) break;
  answer += tip;
}
console.log(answer);

//solve
//큰 값부터 처리하는 그리디
