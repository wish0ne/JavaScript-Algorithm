import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);

const dp = new Array(n + 1).fill(0);

dp[1] = 1;
dp[2] = 3;
for (let i = 3; i <= n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2] * 2) % 796796;
}

console.log(dp[n]);
