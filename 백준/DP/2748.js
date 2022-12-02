import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

//bottom up 풀이 (반복문, dp테이블)
const dp = new Array(n + 1).fill(0);
dp[0] = BigInt(0);
dp[1] = BigInt(1);
for (let i = 2; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}
console.log(dp[n].toString());

//큰 수 처리할때는 BigInt 처리하기! 안하면 오차남
