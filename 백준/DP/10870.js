import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

//bottom up 풀이 (반복문, dp테이블)
const dp = new Array(n + 1).fill(0);
dp[0] = 0;
dp[1] = 1;
for (let i = 2; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}
console.log(dp[n]);

//top down 풀이 (재귀함수, 메모이제이션 이용)
function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(n));
