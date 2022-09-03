import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const p = input[1].split(" ").map(Number);
p.sort((a, b) => a - b); //shortest job first

let time = 0;
let ans = 0;
p.forEach((t) => {
  ans += t + time;
  time += t;
});

console.log(ans);

//solve
//sjf가 평균 대기시간이 가장 짧다

//해설
const N = parseInt(input[0]);
const a = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let acc = 0;
let answer = 0;
//누적합 계산
for (let x of a) {
  acc += x; //이번 사람이 돈을 인출하는데까지 걸리는 시간
  answer += acc;
}
console.log(answer);
