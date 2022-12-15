import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const k = parseInt(input[0]);
const buildings = input[1].split(" ").map(Number);

const levels = new Array(k);
for (let i = 0; i < k; i++) levels[i] = [];

function solve(start, end, i) {
  const root = parseInt((end + start) / 2);
  levels[i].push(buildings[root]);
  if (start >= end) return;
  solve(start, root - 1, i + 1);
  solve(root + 1, end, i + 1);
}

solve(0, buildings.length - 1, 0);
for (let i = 0; i < k; i++) console.log(levels[i].join(" "));

//solve
//똑같은 유형 문제 풀었을때도 어려웠는데...다시풀어도 좀 인덱스 헷갈
//트리보다는 분할정복
