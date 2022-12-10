import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

const dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;
dp[3] = 1;

for (let i = 4; i <= n; i++) {
  dp[i] = Math.min(dp[i - 1], dp[i - 3]) + 1;
}
console.log(dp[n] % 2 === 0 ? "CY" : "SK");

//solve
//dp 어려워 ㅜㅜ

//규칙을 찾으면...걍 홀짝만 구분하면 되는 문제였다...
//1개를 가져가는 경우 == 2개를 가져가는 경우
//홀수일때는 상근 / 짝수일땐 창영이가 무조건 이김
console.log(n % 2 === 0 ? "CY" : "SK");
