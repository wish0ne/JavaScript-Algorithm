import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]); //상근이가 가지고 있는 숫자카드 개수
const cards = input[1].split(" ").map(Number); //숫자 카드
const m = parseInt(input[2]); //정수 개수
const numbers = input[3].split(" ").map(Number); //정수

cards.sort((a, b) => a - b);

const answer = [];
numbers.forEach((number) => {
  let start = find_start_index_binary_search(0, n - 1, number);
  let end = find_end_index_binary_search(0, n - 1, number);
  if (start === -1) answer.push(0);
  else answer.push(end - start + 1);
});

console.log(answer.join(" "));

function find_start_index_binary_search(start, end, target) {
  let index = -1;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (cards[mid] === target) {
      if (mid !== 0 && cards[mid - 1] === target) {
        index = mid;
        end = mid - 1;
      } else return mid;
    } else if (cards[mid] < target) start = mid + 1;
    else if (cards[mid] > target) end = mid - 1;
  }
  return -1;
}

function find_end_index_binary_search(start, end, target) {
  let index = -1;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (cards[mid] === target) {
      if (mid !== end && cards[mid + 1] === target) {
        index = mid;
        start = mid + 1;
      } else return mid;
    } else if (cards[mid] < target) start = mid + 1;
    else if (cards[mid] > target) end = mid - 1;
  }
  return -1;
}

//solve
//쉬운문제고 풀어본 유형인데도 헷갈렸다...! 외워두자 제발 ㅠ

//해설
//이분탐색으로 상한, 하한 구하는것 정도는 외워두자
let ans = [];
for (let num of numbers) {
  let l = lower_bound(cards, num);
  let r = upper_bound(cards, num);
  if (l === -1) ans.push(0);
  else ans.push(r - l + 1);
}
console.log(ans.join(" "));

function lower_bound(a, num) {
  let l = 0;
  let r = a.length - 1;
  let ans = -1;
  while (l <= r) {
    let mid = parseInt((l + r) / 2);
    if (cards[mid] === num) {
      ans = mid;
      r = mid - 1;
    } else if (cards[mid] > num) r = mid - 1;
    else l = mid + 1;
  }
  return ans;
}

function upper_bound(a, num) {
  let l = 0;
  let r = a.length - 1;
  let ans = -1;
  while (l <= r) {
    let mid = parseInt((l + r) / 2);
    if (cards[mid] === num) {
      ans = mid;
      l = mid + 1;
    } else if (cards[mid] > num) r = mid - 1;
    else l = mid + 1;
  }
  return ans;
}
