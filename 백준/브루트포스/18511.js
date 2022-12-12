import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, num] = input[0].split(" ").map(Number);
const K = input[1].split(" ").map(Number);
const len = n.toString().length;

let answer = 0;
let temp = [];
function go(i) {
  if (i === len) return;
  for (let k = 0; k < num; k++) {
    temp.push(K[k]);
    //1~n자리에서 모두 확인
    let now = parseInt(temp.join(""));
    if (now <= n) answer = Math.max(answer, now);
    go(i + 1);
    temp.pop();
  }
}
go(0);
console.log(answer);

//생각보다 어려웠던 문제 😥
//처음엔 문제 잘못읽어서 계속 3개씩 뽑다가 틀리고...
//다음에는 반례 생각못해서 틀리고... N이 x자리라면 가장 큰수는 무조건 x자리일거라 생각했는데 그게 아닌경우도 있음!! 그래서 1~x자리 모두 체크해야함
