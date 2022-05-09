import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const dp = new Array(m + 1).fill(10000);
const arr = [];
for (let i = 1; i <= n; i++) {
  dp[parseInt(input[i])] = 1;
  arr.push(parseInt(input[i]));
}

//해설과 순서 다른것 이해하기
for (let i = 2; i <= m; i++) {
  for (let a of arr) {
    if (i > a) {
      dp[i] = Math.min(dp[i], dp[i - a] + 1);
    }
  }
}
dp[m] === 10000 ? console.log(-1) : console.log(dp[m]);
