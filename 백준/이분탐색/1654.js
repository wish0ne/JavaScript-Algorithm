import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().trim().split("\n");

const [k, n] = input[0].split(" ").map(Number);
const lines = [];
for (let i = 1; i <= k; i++) lines.push(parseInt(input[i]));

let start = 1;
let end = Math.max(...lines);

let ans = 0;
while (start <= end) {
  let mid = parseInt((start + end) / 2);

  //만들 수 있는 랜선 개수 구하기
  let count = 0;
  lines.forEach((l) => {
    count += parseInt(l / mid);
  });

  //부족하면 길이 줄여야함
  if (count < n) end = mid - 1;
  //가능하면 길이 더 늘려보기
  else if (count >= n) {
    ans = mid;
    start = mid + 1;
  }
}

console.log(ans);

//solve
//기본적인 파라메트릭 서치 문제

//해설

//길이 x로 자르면 n보다 많이 만드는게 가능한지 확인
function check(a, n, x) {
  let cnt = 0;
  for (let i = 0; i < a.length; i++) {
    cnt += parseInt(a[i] / x);
  }
  return cnt >= n;
}

let answer = 0;
let l = 1;
let r = Math.max(...lines);
while (l <= r) {
  let mid = parseInt((l + r) / 2); //현재 길이
  //가능하면 길이 늘리기
  if (check(lines, n, mid)) {
    answer = Math.max(answer, mid);
    l = mid + 1;
  } else {
    r = mid - 1;
  }
}

console.log(answer);
