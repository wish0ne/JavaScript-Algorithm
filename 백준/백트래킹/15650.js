import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

let answer = [];
let temp = [];
function go(v) {
  if (temp.length === m) {
    answer.push(temp.join(" "));
    return;
  }
  //✔중복 피하기 위해 이전 숫자 다음부터 진행
  for (let i = v + 1; i <= n; i++) {
    temp.push(i);
    go(i);
    temp.pop();
  }
}
go(0);
console.log(answer.join("\n"));

//solve
//15649번 이해하니까 쉬운 문제
//차이점은 중복을 피하기 위해 이전 숫자 다음부터 진행해주기만 하면 됨
