import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [a, b] = input[0].split(" ").map(Number);

const gcd = Euclidean(a, b); //최대공약수 : 유클리드 호제법으로 계산
const lcd = (a * b) / gcd; //최소공배수 : 두 자연수의 곱 / 최대공약수
console.log(gcd);
console.log(lcd);

function Euclidean(a, b) {
  return b === 0 ? a : Euclidean(b, a % b);
}

//solve
//최소공배수 구하는방법 새로알게됨 ㅎ
