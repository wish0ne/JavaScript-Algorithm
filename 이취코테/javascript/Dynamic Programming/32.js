import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);

const graph = new Array(n);
const dp = new Array(n);
for (let i = 0; i < n; i++) {
  graph[i] = input[i + 1].split(" ").map(Number);
  dp[i] = new Array(i + 1);
}

dp[0][0] = parseInt(input[1]);

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i + 1; j++) {
    //왼쪽 대각선에서 내려온 경우
    let left = [i - 1, j - 1];
    if (left[0] < 0) left[0] = 0; //❌필요 없는 예외처리 (i는 1부터 시작하니까)
    if (left[1] < 0) left[1] = 0;

    //오른쪽 대각선에서 내려온 경우
    let right = [i - 1, j];
    if (right[0] < right[1]) right[1] -= 1;

    dp[i][j] =
      graph[i][j] + Math.max(dp[left[0]][left[1]], dp[right[0]][right[1]]);
  }
}

let max_sum = 0;
for (let i = 0; i < n; i++) {
  max_sum = Math.max(dp[n - 1][i], max_sum);
}
console.log(max_sum);

//solve 😃
//graph 사용하지 않고 바로 dp테이블에 초기 데이터를 담아서 dp테이블을 갱신해도 됨.
