import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const x = input[1].split(" ").map(Number);

//누적합 계산
const sum = new Array(n).fill(0);
sum[0] = x[0];
for (let i = 1; i < n; i++) {
  sum[i] = sum[i - 1] + x[i];
}

let answer = 0;
for (let i = 0; i < n; i++) {
  answer += x[i] * (sum[n - 1] - sum[i]);
}
console.log(answer);

//solve
//결합법칙, 누적합 배열 이용
