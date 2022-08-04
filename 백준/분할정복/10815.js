import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = Number(input[0]); //숫자카드 개수
const cards = input[1].split(" ").map(Number); //숫자카드 정수
const m = Number(input[2]);
const numbers = input[3].split(" ").map(Number); //정수 M개

cards.sort((a, b) => a - b); //이분 탐색 전 정렬

let answer = "";
numbers.forEach((number) => {
  if (check(number, 0, n - 1)) answer += "1 ";
  else answer += "0 ";
});

//이분 탐색
function check(target, start, end) {
  if (start > end) return false;
  const mid = parseInt((start + end) / 2);
  if (cards[mid] === target) return true;
  else if (cards[mid] > target) return check(target, start, mid - 1);
  else return check(target, mid + 1, end);
}

console.log(answer);

//solve
//쉬운 이분탐색 문제

//해설
//이분탐색

function binary_search(a, num) {
  let l = 0;
  let r = a.length - 1;
  let ans = -1;
  while (l <= r) {
    let mid = parseInt((l + r) / 2);
    if (a[mid] === num) return true;
    else if (a[mid] > num) r = mid - 1;
    else l = mid + 1;
  }
  return false;
}

const N = Number(input[0]);
const a = input[1].split(" ").map(Number);
a.sort((a, b) => a - b);
const M = Number(input[2]);
const nums = input[3].split(" ").map(Number);
let ans = "";
for (let num of nums) {
  let res = binary_search(a, num);
  ans += res ? "1 " : "0 ";
}
console.log(ans);
