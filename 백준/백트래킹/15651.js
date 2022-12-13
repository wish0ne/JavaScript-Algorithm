import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

//1~n까지수에서 m개선택(중복가능)
const answer = [];
const arr = [];
function go() {
  if (arr.length === m) {
    answer.push(arr.join(" "));
    return;
  }
  for (let i = 1; i <= n; i++) {
    arr.push(i);
    go();
    arr.pop();
  }
}
go();
console.log(answer.join("\n"));

//solve
//오..N과 M 시리즈 백트래킹 공부하기 진짜 좋은듯
