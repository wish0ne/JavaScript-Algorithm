import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

//수학 : 거듭제곱 빠르게 구하기, 모듈러 연산의 성질 이용
//거듭제곱 -> 재귀 or 이진수의 성질을 이용한 분할정복으로 빠르게 연산가능
//모듈려 연산 -> 분배법칙이 성립

const [a, b, c] = input[0].split(" ").map(BigInt);

function pow(a, b) {
  if (b === 0n) return 1n;
  else if (b === 1n) return a;
  else if (b % 2n === 0n) {
    let temp = pow(a, b / 2n);
    return (temp * temp) % c;
  } else return (a * pow(a, b - 1n)) % c;
}

let answer = pow(a, b) % c;
console.log(answer.toString());

function calc(a, b) {
  let ans = 1n;
  while (b > 0n) {
    if (b % 2n === 1n) ans = (ans * a) % c;
    a = (a * a) % c;
    b /= 2n;
  }
  return ans;
}
console.log((calc(a, b) % c).toString());
