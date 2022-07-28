import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

function next_permutation(a) {
  let i = a.length - 1;
  while (i > 0 && a[i - 1] >= a[i]) {
    i -= 1;
  }
  if (i <= 0) return false;
  let j = a.length - 1;
  while (a[j] <= a[i - 1]) {
    j -= 1;
  }

  [a[i - 1], a[j]] = [a[j], a[i - 1]];

  j = a.length - 1;
  while (i < j) {
    [a[i], a[j]] = [a[j], a[i]];
    i += 1;
    j -= 1;
  }
  return true;
}

function calc(a, ops) {
  let result = a[0];
  for (let i = 0; i < ops.length; i++) {
    switch (ops[i]) {
      case 0:
        result += a[i + 1];
        break;
      case 1:
        result -= a[i + 1];
        break;
      case 2:
        result *= a[i + 1];
        break;
      case 3:
        if (result < 0 && a[i + 1] > 0) {
          result = parseInt((result * -1) / a[i + 1]) * -1;
        } else {
          result = parseInt(result / a[i + 1]);
        }
        break;
    }
  }
  return result;
}

const n = Number(input[0]); //수의 개수
const a = input[1].split(" ").map(Number); //수열
let operations = input[2].split(" ").map(Number); //연산자 배열 (1~10개)

const ops = [];

//사용할 수 있는 모든 연산자 배열
operations.forEach((op, idx) => {
  for (let i = 0; i < op; i++) ops.push(idx);
});
//✔여기선 최소값부터 배열에 넣어서 괜찮았지만, next_permutation쓸때 sort해서 최소값부터 시작하는 습관 들이기

let max = -1000000001;
let min = 1000000001;
while (true) {
  let result = calc(a, ops); //경우의 수 마다 계산
  max = Math.max(max, result);
  min = Math.min(min, result);
  if (!next_permutation(ops)) break; //모든 순열 확인
}

console.log(max === 0 ? 0 : max);
console.log(min === 0 ? 0 : min);

//순열 완탐으로 해결
//실패 1회
//javascript의 number는 실수형이라 -0과 +0이 둘다 존재한다고 한다... -0으로 출력되어서 오답이 났던것
//참고 : https://medium.com/coding-at-dawn/is-negative-zero-0-a-number-in-javascript-c62739f80114

//해설
//순열 완탐

function div(a, b) {
  if (a >= 0) return parseInt(a / b);
  else return -parseInt(-a / b);
}

function calc2(a, b) {
  let n = a.length;
  let ans = a[0];
  for (let i = 1; i < n; i++) {
    if (b[i - 1] === 0) ans += a[i];
    else if (b[i - 1] === 1) ans -= a[i];
    else if (b[i - 1] === 2) ans *= a[i];
    else ans = div(ans, a[i]);
  }
  return ans;
}

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
const cnts = input[2].split(" ").map(Number);

//사용할 수 있는 모든 연산자 배열 생성
const b = [];
cnts.forEach((cnt, i) => {
  for (let k = 0; k < cnt; k++) b.push(i);
});
b.sort((a, b) => a - b);

const ans = []; //모든 계산 결과 저장
while (true) {
  let temp = calc2(A, b);
  ans.push(temp);
  if (!next_permutation(b)) break;
}
ans.sort((a, b) => a - b);
console.log(ans[ans.length - 1] === 0 ? 0 : ans[ans.length - 1]); //최대값
console.log(ans[0] === 0 ? 0 : ans[0]); //최소값
