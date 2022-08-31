import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const w = input[1].split(" ").map(Number);

let max = 0;
function go(w, sum) {
  let n = w.length;
  if (n <= 2) {
    max = Math.max(max, sum);
    return;
  }
  for (let i = 1; i < n - 1; i++) {
    let nw = [...w];
    nw.splice(i, 1);
    go(nw, sum + w[i - 1] * w[i + 1]);
  }
}

go(w, 0);
console.log(max);

//solve
//완탐 -> 쉬운 재귀 문제

//해설
//sum을 파라미터로 안가지고 가면서 재귀 돌아올때마다 더하는? 로직 신선해서 참고하면 좋을듯
//이전 energy에 뒤에서 계산한 합들(ans)이 더해지는것
function go2(a) {
  let n = a.length;
  if (n === 2) return 0;
  let ans = 0;
  for (let i = 1; i < n - 1; i++) {
    let energy = a[i - 1] * a[i + 1];
    let b = [...a];
    b.splice(i, 1);
    energy += go2(b);
    if (ans < energy) ans = energy;
  }
  return ans;
}

console.log(go2(w));
