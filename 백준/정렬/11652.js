import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const numbers = new Array(n);
for (let i = 1; i <= n; i++) numbers[i - 1] = BigInt(input[i]);

numbers.sort((a, b) => {
  if (a > b) return -1;
  return 1;
}); //큰 순으로 정렬(같을때 작은값 출력하기 위함)
let prev = numbers[0];
let count = 1;
let max = 0; //가장 많이 가진 숫자의 개수
let answer = BigInt(0); //가장 많이 가진 숫자
for (let i = 1; i < n; i++) {
  if (numbers[i] !== prev) {
    if (max <= count) {
      max = count;
      answer = prev;
    }
    count = 1;
  } else {
    count += 1;
  }
  prev = numbers[i];
}

if (max <= count) {
  max = count;
  answer = prev;
}

console.log(answer.toString());

//오답 1 : 숫자 범위가 2^53-1을 넘기때문에 Number로 처리하면 안되고 BigInt로 처리해야함
//BigInt는 정렬할때 직접 구현해줘야함 (a-b가 안됨)
//BigInt는 BigInt끼리만 연산 가능하다
//출력할때는 string으로 변환해서 해줘야 뒤에 n이 안붙게 나옴

//해설
let ans = numbers[0]; //가장 많은 개수의 숫자
let ans_cnt = 1; //가장 많은 개수
let cnt = 1; //현재 숫자 개수
for (let i = 1; i < n; i++) {
  if (numbers[i] === numbers[i - 1]) cnt += 1; //연속
  else cnt = 1;
  if (ans_cnt <= cnt) {
    ans_cnt = cnt;
    ans = numbers[i];
  }
}
console.log(ans.toString());
