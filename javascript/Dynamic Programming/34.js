import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);
const soldier = input[1].split(" ").map(Number);

const dp = [];
dp.push(soldier[0]);
for (let i = 1; i < n; i++) {
  if (soldier[i] < dp[dp.length - 1]) dp.push(soldier[i]);
  else {
    let index = -1;
    for (let j = dp.length - 1; j >= 0; j--) {
      if (dp[j] > soldier[i]) {
        index = j;
        break;
      }
    }
    dp[index + 1] = soldier[i];
  }
}
console.log(n - dp.length);

//solve
//전형적인 dp문제같지 않아서 더 어렵고 감이 잘 안왔던 문제였던 것 같다.
//⭐⭐⭐"가장 긴 증가하는 부분 수열 : LIS"⭐⭐⭐ 알고리즘을 기억하자

soldier.reverse(); //순서를 뒤집어 LIS 문제로 변환
const d = new Array(n).fill(1);
d[0] = 1; //d[i] : soldier[i]를 마지막 원소로 가지근 ㄴ부분 수열의 최대 길이
//점화식 : 모든 0<=j<i에 대하여 d[i] = max(d[i], d[j]+1) if (soldier[j] < soldier[i])
for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (soldier[i] < soldier[j]) d[i] = d[j] + 1;
  }
}

console.log(n - Math.max(...d));
