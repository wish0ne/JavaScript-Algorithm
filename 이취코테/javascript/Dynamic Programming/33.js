import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);

const time = [];
const price = [];
for (let i = 1; i <= n; i++) {
  const [t, p] = input[i].split(" ").map(Number);
  time.push(t);
  price.push(p);
}

// DP 테이블 초기화
const dp = new Array(n).fill(0);
for (let i = 0; i < n; i++) {
  if (i + time[i] > n) dp[i] = 0;
  else dp[i] = price[i];
}

for (let i = 0; i < n; i++) {
  if (i + time[i] >= n) continue;
  for (let j = i + time[i]; j < n; j++) {
    if (j + time[j] > n) continue;
    dp[j] = Math.max(dp[j], dp[i] + price[j]);
  }
}

console.log(Math.max(...dp));

//solve
//띄엄띄엄 상담을 해도 되는 경우를 생각못함!
//그리고 dp답게 풀지 못한것 같음 🙁 점화식을 세우지 못함

//점화식 : dp[i] = max(p[i]+dp[t[i]+i], max_value);
//dp[i] : i번째날부터 마지막날까지 낼 수 있는 최대 이익
//max_value : 현재까지의 최대 상담 금액에 해당하는 변수

let max_value = 0;
const d = new Array(n + 1).fill(0);

//뒤에서부터 확인
for (let i = n - 1; i >= 0; i--) {
  let t = time[i] + i;
  //상담이 기간안에 끝나는 경우
  if (t <= n) {
    //점화식에 맞게 현재까지의 최고 이익 계산
    d[i] = Math.max(price[i] + d[t], max_value);
    max_value = d[i];
  }
  //상담이 기간을 벗어나는 경우
  else {
    d[i] = max_value;
  }
}
console.log(d);
console.log(max_value);
