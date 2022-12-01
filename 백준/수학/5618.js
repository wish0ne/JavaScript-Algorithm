import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

//brute force O(N) 풀이
const n = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);
const min = Math.min(...arr);

const answer = [];
for (let i = 1; i <= min; i++) {
  if (arr.every((v) => v % i === 0)) answer.push(i);
}
console.log(answer.join("\n"));

//유클리드 알고리즘 풀이
//두 수의 공약수 == 최대공약수의 약수
//세 수의 최대공약수 =>두 수의 최대공약수와 나머지 한 수의 최대공약수 => [A, B, C] = [(A, B), C]
function Euclidean(a, b) {
  return b === 0 ? a : Euclidean(b, a % b);
}
function getDivisor(n) {
  const divisors = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      divisors.push(i);
      if (n / i !== i) divisors.push(n / i);
    }
  }
  divisors.sort((a, b) => a - b);
  return divisors;
}

if (n === 2) {
  //최대공약수 구하기
  const gcd = Euclidean(arr[0], arr[1]);
  //최대공약수의 약수 구하기
  console.log(getDivisor(gcd).join("\n"));
} else if (n === 3) {
  //두 수의 최대 공약수 구하기
  let gcd = Euclidean(arr[0], arr[1]);
  //두 수의 최대 공약수와 나머지 한 수의 최대공약수 구하기
  gcd = Euclidean(gcd, arr[2]);
  //최대공약수의 약수 구하기
  console.log(getDivisor(gcd).join("\n"));
}

//solve
//쉬운 문제지만 알아두면 좋은게 많은 문제
//1. 최대공약수 구하는 효율적인 방법 : 유클리드 알고리즘
//2. 세 수의 최대공약수 =>두 수의 최대공약수와 나머지 한 수의 최대공약수 => [A, B, C] = [(A, B), C]
//3. 약수 빠르게 구하는 알고리즘 => N의 약수를 구할때는 1부터 N의 제곱근까지만 확인하면됨
//                                구한 약수를 가지고 나눈 값 역시 약수가 됨
