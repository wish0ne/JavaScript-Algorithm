import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const t = parseInt(input[0]);
for (let test = 1; test <= t; test++) {
  const [n, m] = input[test].split(" ").map(Number);

  //조합 경우의 수 계산하기
  const answer = factorial(m) / factorial(m - n) / factorial(n);
  console.log(answer.toFixed(0));
}

function factorial(n) {
  if (n === 0) return 1;
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

//solve
//바보..걍 m개중에 n개 선택해서 순서대로 주면됨...
//dp 풀이는...아직 어렵다
