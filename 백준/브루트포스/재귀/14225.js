import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = Number(input[0]);
const s = input[1].split(" ").map(Number);

let arr = new Set();
function calc(index, sum) {
  if (index === n) {
    arr.add(sum);
    return;
  }
  calc(index + 1, sum + s[index]);
  calc(index + 1, sum);
}

calc(0, 0);
arr = Array.from(arr);
arr.sort((a, b) => a - b);

let ans = 0;
let i = 0;
while (true) {
  if (arr[i] !== ans) break;
  i += 1;
  ans += 1;
}

console.log(ans);

//solve
//가능한 부분합을 모두 계산하고 오름차순으로 정렬하여 앞에서부터 없는 자연수를 찾음
//간단한 문제였는데 헷갈려서 푸는데 오래 걸린 문제. 완전탐색을 두려워하지 말자...

//해설 : 재귀를 이용한 완전탐색
//동일한 로직이지만
// 1) true/false이용해서 중복 처리 vs set으로 중복처리
// 2) 배열을 이용해서 정렬 과정 생략
//동일한 로직을 더 효율적으로 짤 수 있도록 노력해보자

const N = Number(input[0]);
const a = input[1].split(" ").map(Number);
const c = new Array(N * 100000 + 10).fill(false); //부분합으로 만들 수 있는지 없는지 모두 체크

function go(i, sum) {
  //부분합 완성
  if (i === N) {
    c[sum] = true;
    return;
  }
  go(i + 1, sum + a[i]);
  go(i + 1, sum);
}
go(0, 0);
let j = 1;
while (true) {
  if (!c[j]) break;
  j += 1;
}
console.log(j);
