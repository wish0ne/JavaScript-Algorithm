//해설 : 비트마스크 이용
//부분수열을 모두 만드는 방법 1) 재귀 호출 2) 비트마스크

import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const a = input[1].split(" ").map(Number);

//넉넉하게 10을 더함
const c = new Array(n * 100000 + 10).fill(false); //c[i]===true : i를 만들 수 있음

//모든 부분수열 생성
for (let i = 0; i < 1 << n; i++) {
  let s = 0;
  //각 부분수열에 대해, 각 원소가 해당 부분수열에 포함되는지 아닌지 확인
  for (let j = 0; j < n; j++) {
    //j번째 bit가 1인지 -> j가 포함되어 있는지
    if (i & (1 << j)) s += a[j]; //j번째 bit가 1이면 포함되는것
  }
  //포함되는 원소들의 합 = s가 이번에 만들어낸 부분수열의 합
  c[s] = true;
}

let i = 1;
while (true) {
  if (!c[i]) break;
  i += 1;
}
console.log(i);
