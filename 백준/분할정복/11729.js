import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const k = parseInt(input[0]);

let answer = [];
function move(n, start, dest) {
  if (n === 1) {
    answer.push([start, dest]);
    return;
  }
  let set = new Set([start, dest]);
  let mid = -1;
  if (!set.has(1)) mid = 1;
  else if (!set.has(2)) mid = 2;
  else mid = 3;
  move(n - 1, start, mid);
  move(1, start, dest);
  move(n - 1, mid, dest);
}
move(k, 1, 3);
console.log(answer.length);
for (let i = 0; i < answer.length; i++) answer[i] = answer[i].join(" ");
console.log(answer.join("\n"));

//solve
//역시 점화식 문제에 약해... 점화식이 존재하는 문제인지 알아차리는것부터 점화식을 찾아내는데까지 너무 오래걸림 🥺
//분할정복 -> 점화식을 찾아내보자 (dp처럼)
//재귀를 브루트포스에 이용하는거랑 vs 분할정복에 이용하는거랑 구분해서 알아두자

//해설
//z = 6-x-y로 구할 수 있음
//이동 횟수의 점화식을 통해 일반항도 구할 수 있음(2^n-1)
let ans = "";
function solve(n, x, y) {
  if (n === 0) return;
  solve(n - 1, x, 6 - x - y);
  ans += `${x} ${y}\n`;
  solve(n - 1, 6 - x - y, y);
}

console.log(Math.pow(2, k) - 1);
solve(k, 1, 3);
console.log(ans.trim());
